'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const WHATSAPP = '237679089324'; // put your number here, no + or spaces

export default function Home() {
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function join(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      const { error } = await supabase
        .from('waitlist')
        .insert({ email: email.trim().toLowerCase(), specialty });
      if (error && error.code === '23505') setMsg("You're already on the list.");
      else if (error) setMsg('Error: ' + error.message);
      else { setMsg("You're in. Founding Editor spot reserved."); setEmail(''); }
       } catch (err) {
      setMsg('Error: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <main className="wrap">
        <section className="hero">
          <div className="logo">SLIME</div>
          <h1>Get ranked for your editing, not your followers.</h1>
          <p className="sub">
            Compete in editing challenges, build a reputation, and get discovered.
            Small audience? Doesn't matter. Your work decides.
          </p>
          <form onSubmit={join}>
            <input type="email" required placeholder="Your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="">Your style (optional)</option>
              <option>Anime / AMV</option>
              <option>Cinematic</option>
              <option>Sports</option>
              <option>Music videos</option>
              <option>Motion graphics / VFX</option>
              <option>Other</option>
            </select>
            <button disabled={loading}>{loading ? 'Joining...' : 'Join the waitlist'}</button>
          </form>
          <p className="msg">{msg}</p>
        </section>

        <section className="grid">
          <div className="card"><h3> Recognition</h3><p>Profiles, rankings, badges and a Hall of Fame that record your growth.</p></div>
          <div className="card"><h3> Competition</h3><p>Themed challenges with clear rules. Submit, get judged, climb the leaderboard.</p></div>
          <div className="card"><h3> Community</h3><p>Discover editors, give feedback, and celebrate winners.</p></div>
        </section>

        <p className="founding">
          The first <strong>50 editors</strong> get a permanent <strong>Founding Editor</strong> badge.
        </p>
      </main>

      <footer>© Slime. Built for editors.</footer>

      <a className="wa" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
        Chat on WhatsApp
      </a>
    </>
  );
}