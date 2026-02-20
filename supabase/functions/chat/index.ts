import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// IBIT Platform context for the AI
const IBIT_CONTEXT = `
You are the IBIT AI Assistant, a helpful and knowledgeable representative of IBIT (Innovative Business & Information Technology).

About IBIT:
- IBIT is a cutting-edge technology company specializing in IT solutions, digital transformation, and innovative business services
- We provide comprehensive IT infrastructure, network solutions, server management, and cloud services
- Our expertise includes cybersecurity, software development, data center management, and IT consulting
- We serve businesses of all sizes, from startups to enterprises

Our Core Services:
1. IT Infrastructure - Complete IT setup, maintenance, and optimization
2. Network Solutions - Enterprise networking, WiFi deployment, and connectivity solutions
3. Cloud Services - Cloud migration, management, and hybrid solutions
4. Cybersecurity - Security audits, implementation, and 24/7 monitoring
5. Software Development - Custom applications, web platforms, and mobile apps
6. Data Center Services - Server hosting, colocation, and managed services
7. IT Consulting - Strategic planning, digital transformation guidance

Our Values:
- Innovation: Embracing cutting-edge technology
- Reliability: 24/7 support and guaranteed uptime
- Excellence: Delivering world-class solutions
- Partnership: Working alongside our clients for success

Contact Information:
- We're available for consultations and project discussions
- Reach out through the contact form on our website
- Our team responds within 24 hours

Response Guidelines:
- Be professional, friendly, and helpful
- Provide concise but informative answers
- If asked about specific pricing, suggest contacting us for a custom quote
- Highlight IBIT's expertise and capabilities when relevant
- Keep responses brief (2-3 sentences) unless more detail is needed
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build messages array with context and history
    const messages = [
      { role: 'system', content: IBIT_CONTEXT },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request. Please try again.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        response: "I'm experiencing some technical difficulties. Please try again in a moment."
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
