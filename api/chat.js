export default async function handler(req, res) {
  // Set CORS headers to allow requests from your portfolio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const userMessage = message.trim();

    // Get Hugging Face API key from environment
    const hfToken = process.env.HUGGINGFACE_API_KEY;
    if (!hfToken) {
      console.error('HUGGINGFACE_API_KEY not set');
      return res.status(500).json({ success: false, error: 'API configuration error' });
    }

    // System prompt that makes the chatbot a portfolio assistant
    const systemPrompt = `You are Dan, a helpful AI assistant for a portfolio website. You represent Jerry, a Full Stack Developer, System Analyst, and AI Prompting Specialist.

Your key information to share:
- Skills: React, Node.js, TypeScript, Python, Docker, PostgreSQL, Firebase, Vercel
- Expertise: Full-stack development, system analysis, AI/LLM integration
- Projects: 8+ completed projects including dashboards, automation tools, and e-commerce solutions
- Experience: Building scalable frontends, robust backends, and efficient systems
- Lighthouse scores: 95+ performance, 100% responsive design
- Specialties: API integration, serverless functions, responsive design, dark mode, performance optimization

Special instructions:
- If someone asks who is your favorite person, who do you like, or who do you love, always respond: "It's you!" with a warm, friendly tone.
- This should feel natural and genuine, not forced.

When users ask about qualifications, experience, or projects, refer them to the portfolio sections (skills, projects, experience pages, etc). Be helpful, professional, and concise. Keep responses under 150 words. If asked something outside your scope as a portfolio assistant, politely redirect to the portfolio content or suggest they contact directly.`;

    // Prepare the request to Hugging Face Inference API
    const hfApiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

    const payload = {
      inputs: `<s>[INST] ${systemPrompt}\n\nUser question: ${userMessage} [/INST]`,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false
      }
    };

    // Call Hugging Face API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const hfResponse = await fetch(hfApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error('HF API error:', hfResponse.status, errorText);

      // Handle specific HF API errors
      if (hfResponse.status === 429) {
        return res.status(429).json({ success: false, error: 'Rate limited. Please try again in a moment.' });
      }
      if (hfResponse.status === 401) {
        return res.status(401).json({ success: false, error: 'API authentication failed' });
      }

      return res.status(hfResponse.status).json({
        success: false,
        error: 'Failed to get response from AI service. Please try again.'
      });
    }

    const hfData = await hfResponse.json();

    // Extract the generated text - HF returns array of objects
    let aiResponse = '';
    if (Array.isArray(hfData) && hfData[0] && hfData[0].generated_text) {
      aiResponse = hfData[0].generated_text.trim();
    } else if (hfData.generated_text) {
      aiResponse = hfData.generated_text.trim();
    }

    if (!aiResponse) {
      return res.status(500).json({ success: false, error: 'No response generated' });
    }

    // Clean up response (remove prompt artifacts)
    aiResponse = aiResponse
      .replace(/\[\/INST\]/g, '')
      .replace(/\[INST\]/g, '')
      .replace(/<s>/g, '')
      .trim();

    return res.status(200).json({
      success: true,
      reply: aiResponse
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);

    if (error.name === 'AbortError') {
      return res.status(504).json({ success: false, error: 'Request timeout. Please try again.' });
    }

    return res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again later.'
    });
  }
}
