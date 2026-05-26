const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, tel, interest, message } = req.body;

  if (!name || !tel || !interest) {
    return res.status(400).json({ error: '필수 항목 누락' });
  }

  const { error } = await supabase
    .from('consultations')
    .insert([{
      name: name.trim(),
      tel: tel.trim(),
      interest,
      message: (message || '').trim(),
    }]);

  if (error) {
    console.error('Supabase insert error:', error.message);
    return res.status(500).json({ error: '저장 실패' });
  }

  return res.status(200).json({ success: true });
};
