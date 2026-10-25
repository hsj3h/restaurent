import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

type Page = 'home' | 'menu' | 'story' | 'gallery' | 'order'
type Dish = { name: string; price: number; category: string; image: string; desc: string; tag?: string; veg?: boolean; spicy?: boolean }

const IMG = {
  hero: 'https://images.unsplash.com/photo-1562436260-126d541901e0?auto=format&fit=crop&w=1600&q=88',
  rolls: 'https://images.unsplash.com/photo-1648146298904-d58a8c79e0a7?auto=format&fit=crop&w=1100&q=85',
  nigiri: 'https://images.unsplash.com/photo-1717988732486-285ea23a6f88?auto=format&fit=crop&w=1100&q=85',
  plate: 'https://images.unsplash.com/photo-1562436261-3d97e9e237c6?auto=format&fit=crop&w=1400&q=88',
  chef: 'https://images.unsplash.com/photo-1681270496598-13c5365730c8?auto=format&fit=crop&w=1200&q=85',
  counter: 'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?auto=format&fit=crop&w=1400&q=85',
  night: 'https://images.unsplash.com/photo-1773478252785-cb9adb22aff9?auto=format&fit=crop&w=1600&q=85',
  alley: 'https://images.unsplash.com/photo-1773932406967-a27f3a3ca3e3?auto=format&fit=crop&w=1200&q=85',
  mochi: 'https://images.unsplash.com/photo-1769123279121-eb3479ba3531?auto=format&fit=crop&w=1000&q=85',
  ramen: 'https://images.unsplash.com/photo-1784378578794-f973c7ad4a86?auto=format&fit=crop&w=1100&q=85',
}

const dishes: Dish[] = [
  { name: 'Dragon Blaze Roll', price: 14.9, category: 'Signature Rolls', image: IMG.rolls, desc: 'Salmon, avocado, chilli glaze & crispy leek.', tag: "CHEF'S PICK", spicy: true },
  { name: 'Tokyo Crunch Roll', price: 12.9, category: 'Signature Rolls', image: IMG.plate, desc: 'Prawn, cucumber, sesame & golden tempura.', tag: 'BESTSELLER' },
  { name: 'Midnight Tuna Maki', price: 9.9, category: 'Classic Maki', image: IMG.nigiri, desc: 'Tuna, shiso and a streak of yuzu kosho.' },
  { name: 'Volcano Tempura Roll', price: 13.9, category: 'Signature Rolls', image: IMG.hero, desc: 'Tempura prawn, spicy mayo and tobiko.', spicy: true },
  { name: 'Sakura Salmon Nigiri', price: 6.5, category: 'Nigiri', image: IMG.nigiri, desc: 'Hand-pressed rice, salmon and yuzu.' },
  { name: 'Classic Tuna Nigiri', price: 7, category: 'Nigiri', image: IMG.plate, desc: 'Lean tuna, seasoned rice and wasabi.' },
  { name: 'Salmon Sashimi Plate', price: 12.9, category: 'Sashimi', image: IMG.hero, desc: 'Six clean cuts with daikon and shiso.' },
  { name: 'Cucumber Crunch Maki', price: 7.5, category: 'Classic Maki', image: IMG.rolls, desc: 'Cucumber, sesame and crisp shallot.', veg: true },
  { name: 'Green Dragon Roll', price: 11.9, category: 'Veggie', image: IMG.rolls, desc: 'Avocado, cucumber, asparagus and sesame.', veg: true },
  { name: 'Tokyo Miso Ramen', price: 14.5, category: 'Hot Dishes', image: IMG.ramen, desc: 'Deep miso broth, noodles, egg and nori.' },
  { name: 'Sushi Chat Bento Box', price: 18.9, category: 'Bento', image: IMG.plate, desc: 'A little bit of everything. Big energy.' },
  { name: 'Matcha Cloud Cheesecake', price: 6.9, category: 'Desserts', image: IMG.mochi, desc: 'Silky matcha cream and sesame crumb.', veg: true },
]

const nav: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' }, { id: 'menu', label: 'Menu' }, { id: 'story', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' }, { id: 'order', label: 'Order & Reservations' },
]

function Mascot({ small = false, mood = 'wild' }: { small?: boolean; mood?: string }) {
  return <div className={`mascot ${small ? 'mascot--small' : ''}`} aria-label={`Sushi Chat fox illustration, ${mood} pose`}>
    <img src="/kitsune-fox-reference.png" alt={`Sushi Chat fox illustration, ${mood} pose`} />
  </div>
}

function Icon({ children, label, onClick, count }: { children: ReactNode; label: string; onClick?: () => void; count?: number }) {
  return <button className="icon-btn" aria-label={label} onClick={onClick}>{children}{count !== undefined && <b>{count}</b>}</button>
}

function Button({ children, kind = 'primary', onClick, type = 'button' }: { children: ReactNode; kind?: 'primary' | 'ghost' | 'dark'; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn btn--${kind}`} onClick={onClick}><span>{children}</span><span aria-hidden>↗</span></button>
}

function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span>✦</span>{children}</div> }

function Header({ page, go, cartCount, openCart }: { page: Page; go: (p: Page) => void; cartCount: number; openCart: () => void }) {
  const [mobile, setMobile] = useState(false)
  return <header className="header">
    <button className="logo" onClick={() => go('home')} aria-label="Sushi Chat home"><span className="logo-mark">寿</span><span>SUSHI<small>CHAT</small></span></button>
    <nav className={mobile ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
      {nav.map(n => <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => { go(n.id); setMobile(false) }}>{n.label}</button>)}
    </nav>
    <div className="header-actions">
      <Icon label="Open cart" count={cartCount} onClick={openCart}>
        <svg viewBox="0 0 24 24"><path d="M3 4h2l2.2 10h10.7l2-7H7M9 20h.01M17 20h.01" /></svg>
      </Icon>
      <Button onClick={() => go('order')}>ORDER NOW</Button>
      <Icon label="Toggle menu" onClick={() => setMobile(!mobile)}>
        <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </Icon>
    </div>
  </header>
}

function Footer({ go }: { go: (p: Page) => void }) {
  const [joined, setJoined] = useState(false)
  return <footer className="footer">
    <div className="footer-top"><div><Eyebrow>SUSHI CHAT CLUB</Eyebrow><h2>GET THE GOOD<br />STUFF FIRST.</h2></div>
      <form className="subscribe" onSubmit={e => { e.preventDefault(); setJoined(true) }}>{joined ? <p className="subscribe-success">YOU’RE ON THE LIST — THANKS!</p> : <><label htmlFor="newsletter">UMAMI IN YOUR INBOX</label><div><input id="newsletter" required type="email" placeholder="you@email.com" /><button type="submit">JOIN ↗</button></div></>}</form></div>
    <div className="footer-grid"><div className="logo logo--light"><span className="logo-mark">寿</span><span>SUSHI<small>CHAT</small></span></div>
      <div><b>EXPLORE</b>{nav.map(n => <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>)}</div>
      <div><b>VISIT</b><span>9001 Av. des Acacias</span><span>L'Union, Occitanie</span><span>France</span></div>
      <div><b>PLAN YOUR VISIT</b><span>Takeaway & dine-in</span><span>Reservations welcome</span><a href="https://fr.restaurantguru.com/Sushi-Chat-LUnion" target="_blank" rel="noreferrer">See current details ↗</a></div></div>
    <div className="footer-bottom"><span>© 2026 SUSHI CHAT</span><span>DEVELOPED BY HAREESH</span><span>IG / TK / FB</span></div>
  </footer>
}

function SectionTitle({ eye, title, copy }: { eye: string; title: ReactNode; copy?: string }) {
  return <div className="section-title"><Eyebrow>{eye}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function DishCard({ dish, add }: { dish: Dish; add: (d: Dish) => void }) {
  return <article className="dish-card">
    <div className="dish-img"><img src={dish.image} alt={dish.name} />{dish.tag && <span className="badge">{dish.tag}</span>}<button className="quick" onClick={() => add(dish)}>+</button></div>
    <div className="dish-info"><div><div className="meta">{dish.category} {dish.veg && <i>VEG</i>} {dish.spicy && <i>HOT</i>}</div><h3>{dish.name}</h3><p>{dish.desc}</p></div><strong>€{dish.price.toFixed(2)}</strong></div>
  </article>
}

function Home({ go, add }: { go: (p: Page) => void; add: (d: Dish) => void }) {
  const [mood, setMood] = useState('SPICY & BOLD')
  const moods = ['SPICY & BOLD', 'FRESH & LIGHT', 'CRUNCHY & CRISPY', 'VEGGIE MODE', "CHEF'S SURPRISE"]
  return <>
    <section className="hero">
      <div className="sun" /><span className="vertical">東京の魂 • HANDCRAFTED</span>
      <div className="hero-copy"><Eyebrow>SUSHI CHAT • L'UNION, OCCITANIE</Eyebrow><h1>A LITTLE MAGIC.<br /><em>A LOT OF</em><br />UMAMI.</h1><p>Japanese-inspired dishes, friendly service, and unforgettable evenings.</p>
        <div className="button-row"><Button onClick={() => go('menu')}>EXPLORE THE MENU</Button><Button kind="ghost" onClick={() => go('order')}>ORDER YOUR FEAST</Button></div>
        <span className="scribble">MADE FRESH. SERVED WITH ATTITUDE. ↗</span></div>
      <div className="hero-visual"><div className="hero-img hero-poster"><img src="/kitsune-fox-reference.png" alt="White kitsune fox watching over a sushi feast" /></div><div className="stamp">FRESH<br />CUTS<br /><small>毎日</small></div></div>
      <div className="scroll">SCROLL TO FEAST <span>↓</span></div>
    </section>
    <section className="section cream"><SectionTitle eye="THE FRESH DROP" title={<>MEET YOUR NEXT <em>OBSESSION.</em></>} copy="Big flavours. Fresh rolls. Main-character energy." />
      <div className="dish-grid">{dishes.slice(0, 4).map(d => <DishCard key={d.name} dish={d} add={add} />)}</div><div className="center"><Button kind="dark" onClick={() => go('menu')}>VIEW FULL MENU</Button></div></section>
    <section className="quest">
      <div className="quest-guide"><Mascot /><div className="speech">I know a roll<br />with your name on it.</div></div>
      <div><SectionTitle eye="SUSHI QUEST 01" title={<>WHAT'S YOUR<br /><em>SUSHI MOOD?</em></>} copy="Choose your current energy. We'll do the delicious detective work." />
        <div className="mood-grid">{moods.map((m, i) => <button key={m} className={mood === m ? 'selected' : ''} onClick={() => setMood(m)}><span>0{i + 1}</span>{m}</button>)}</div>
        <p className="recommend">YOUR MATCH: <b>{mood === 'VEGGIE MODE' ? 'GREEN DRAGON ROLL' : mood.includes('SPICY') ? 'DRAGON BLAZE ROLL' : 'TOKYO CRUNCH ROLL'}</b></p>
        <Button onClick={() => go('menu')}>FIND YOUR PERFECT ROLL</Button></div>
    </section>
    <section className="after-dark"><img src={IMG.night} alt="Japanese street at night" /><div className="after-overlay"><Eyebrow>LIMITED NIGHT DROP</Eyebrow><h2>WHEN TOKYO<br />WAKES UP,<br /><em>FLAVOURS GO WILD.</em></h2><div className="promo"><b>MIDNIGHT TOKYO BOX</b><span>€24.90</span><p>A sample feast for late-night legends.</p><Button onClick={() => go('menu')}>DISCOVER THE BOX</Button></div></div></section>
    <section className="story-preview"><div className="story-art"><Mascot /><span className="big-jp">狐</span></div><div className="story-photo"><img src={IMG.chef} alt="Chef preparing sushi" /></div><div className="story-copy"><SectionTitle eye="OUR ORIGIN STORY" title={<>NOT JUST SUSHI.<br /><em>IT'S A WHOLE VIBE.</em></>} copy="Rooted in Japanese inspiration, made for curious appetites, and served with a little mischief." /><Button kind="dark" onClick={() => go('story')}>DISCOVER OUR STORY</Button></div></section>
    <Testimonials />
  </>
}

const testimonials = [
  { name: 'Vidal', source: 'Restaurant Guru', text: 'Fresh produce, a relaxing atmosphere, generous and tasty portions, and a very friendly welcome.' },
  { name: 'Elena Duron', source: 'Google', text: "Good morning. This is the second time I’ve come to this small restaurant with my mother after work. We arrived around 7:40 pm, were seated immediately, and our order was taken quickly. The dishes arrived very quickly too. Frankly, it’s always just as good. I highly recommend it for a great evening out." },
  { name: 'Crocotte', source: 'Google', text: 'Great place! Whether you eat in or take away, the quality is top-notch, the quantity is great, and the atmosphere is great. The restaurant and toilets are nice, well-maintained and clean. Vegetarian options are available, with plenty of free parking and wheelchair accessibility. We will gladly return.' },
  { name: 'Thierry Vye', source: 'Google', text: 'A place where you immediately feel at ease and where they serve mouth-watering Japanese dishes. I really enjoyed that moment. This is a good address to remember, in a quiet area with easy parking.' },
  { name: 'jok stifler', source: 'Google', text: "A huge surprise! Clearly the best sushi I’ve had in France. The fish is incredibly fresh, the portions are generous, and every bite is flavorful. You can taste the quality of the ingredients and the care taken in preparing the dishes. Impeccable service too. I’ll definitely be back. Tucked away in a little corner, this restaurant is a real gem. Cozy atmosphere. We loved it." },
]

function Testimonials() {
  return <section className="section testimonials" aria-labelledby="testimonials-title">
    <SectionTitle eye="CUSTOMER TESTIMONIALS" title={<>SUSHI CHAT<br /><em>FAVOURITES.</em></>} copy="Kind words from guests who have shared a meal with us." />
    <div className="testimonial-grid">{testimonials.map((review, i) => <blockquote className="testimonial-card" key={review.name}>
      <div className="testimonial-top"><span className="review-avatar">{review.name.charAt(0).toUpperCase()}</span><div><cite>{review.name}</cite><small>★★★★★</small></div><span className="review-number">0{i + 1}</span></div>
      <p>“{review.text}”</p><footer>REVIEWED ON {review.source.toUpperCase()}</footer>
    </blockquote>)}</div>
  </section>
}

function Menu({ add }: { add: (d: Dish) => void }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const cats = ['All', 'Nigiri', 'Sashimi', 'Classic Maki', 'Signature Rolls', 'Hot Dishes', 'Bento', 'Veggie', 'Desserts']
  const shown = dishes.filter(d => (category === 'All' || d.category === category) && d.name.toLowerCase().includes(query.toLowerCase()))
  return <>
    <PageHero eye="FULL-POWER FLAVOUR" title={<>PICK YOUR FIGHT.<br /><em>FEAST LIKE A LEGEND.</em></>} copy="From delicate nigiri to full-power signature rolls, find your next favourite bite." mascot />
    <main className="menu-wrap">
      <div className="menu-tools"><label className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your cravings…" /></label><span>{shown.length} FRESH BITES</span></div>
      <div className="chips">{cats.map(c => <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div>
      <div className="menu-heading"><Eyebrow>THE MAIN EVENT</Eyebrow><h2>{category === 'All' ? 'ALL KILLER. NO FILLER.' : category.toUpperCase()}</h2><p>Explore our Japanese-inspired selection. Please confirm current menu details and allergens directly with Sushi Chat.</p></div>
      <div className="dish-grid dish-grid--menu">{shown.map(d => <DishCard key={d.name} dish={d} add={add} />)}</div>
      {shown.length === 0 && <div className="empty"><Mascot small /><h3>NO ROLLS HIDING HERE.</h3><p>Try another craving or clear your search.</p></div>}
    </main>
  </>
}

function PageHero({ eye, title, copy, mascot }: { eye: string; title: ReactNode; copy: string; mascot?: boolean }) {
  return <section className="page-hero"><div><Eyebrow>{eye}</Eyebrow><h1>{title}</h1><p>{copy}</p></div>{mascot && <Mascot />}</section>
}

function Story({ go }: { go: (p: Page) => void }) {
  return <>
    <PageHero eye="THE SUSHI CHAT STORY" title={<>MORE THAN SUSHI.<br /><em>IT'S A WHOLE WORLD.</em></>} copy="A place for appetite, craft, and the lively spirit of Japanese dining." mascot />
    <section className="editorial"><div><Eyebrow>CHAPTER 01 — ORIGIN</Eyebrow><h2>BORN FROM A<br /><em>LOVE OF JAPAN.</em></h2></div><div><p className="lead">Sushi Chat brings together generous Japanese dishes, friendly service, and a relaxed atmosphere.</p><p>Inspired by the precision of Japanese food culture and made for curious appetites, every visit is designed to feel warm, flavourful, and worth sharing.</p></div><img src={IMG.alley} alt="Japanese street at night" /></section>
    <section className="craft"><SectionTitle eye="CHAPTER 02 — THE CRAFT" title={<>EVERY CUT. EVERY ROLL.<br /><em>EVERY DETAIL.</em></>} /><div className="craft-grid">{[
      ['01', 'SELECT', IMG.plate, 'Start with colour, texture and intent.'], ['02', 'PREPARE', IMG.chef, 'Rice seasoned. Knives ready.'], ['03', 'ROLL', IMG.rolls, 'Balance every layer and bite.'], ['04', 'PRESENT', IMG.nigiri, 'Finish like the frame of a manga.']
    ].map(x => <article key={x[0]}><img src={x[2]} alt={x[1]} /><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[3]}</p></article>)}</div></section>
    <section className="chef-profile"><div className="chef-image"><img src={IMG.counter} alt="Sushi being prepared at the counter" /><span>CRAFTED WITH CARE</span></div><div><Eyebrow>CHAPTER 03 — THE HANDS</Eyebrow><h2>THE HANDS BEHIND<br /><em>THE MAGIC.</em></h2><h3>THE SUSHI CHAT TEAM</h3><p>Every plate is guided by care, balance, and the pleasure of sharing good food. From fresh ingredients to generous portions, Sushi Chat is made for easy, welcoming dining.</p><dl><div><dt>PHILOSOPHY</dt><dd>Fresh ingredients. Thoughtful preparation.</dd></div><div><dt>OUR PROMISE</dt><dd>Warm service and flavour in every bite.</dd></div></dl></div></section>
    <section className="kitsune-story"><Mascot /><div><Eyebrow>CHAPTER 04 — THE SPIRIT</Eyebrow><h2>A WARM WELCOME.<br /><em>A LOT OF FLAVOUR.</em></h2><p>Sushi Chat is for adventurous eaters and anyone who believes dinner should feel like discovering a favourite new address.</p><div className="principles">{['FRESH THINKING.', 'BOLD FLAVOURS.', 'GOOD VIBES.'].map((p, i) => <span key={p}><b>0{i + 1}</b>{p}</span>)}</div><Button onClick={() => go('menu')}>EXPLORE THE MENU</Button></div></section>
  </>
}

function Gallery({ go }: { go: (p: Page) => void }) {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const tiles = [
    ['Sushi', IMG.hero], ['Behind the Scenes', IMG.chef], ['Restaurant', IMG.night], ['Sushi', IMG.nigiri],
    ['Anime Art', 'mascot'], ['Restaurant', IMG.counter], ['Sushi', IMG.rolls], ['Behind the Scenes', IMG.alley], ['Sushi', IMG.mochi],
  ]
  const visible = tiles.filter(t => filter === 'All' || t[0] === filter)
  return <>
    <PageHero eye="SUSHI CHAT VISUAL ARCHIVE" title={<>THE WORLD OF<br /><em>SUSHI CHAT.</em></>} copy="Food, art, people, and everything in between." mascot />
    <section className="gallery-wrap"><div className="chips">{['All', 'Sushi', 'Behind the Scenes', 'Restaurant', 'Anime Art'].map(c => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div>
      <div className="masonry">{visible.map((t, i) => <button className={`gallery-tile tile-${i % 5}`} key={`${t[0]}${i}`} onClick={() => t[1] !== 'mascot' && setLightbox(t[1])}>{t[1] === 'mascot' ? <><Mascot /><strong>STAY WILD.<br />EAT WELL.</strong></> : <img src={t[1]} alt={`${t[0]} gallery image`} />}<span>{t[0]} <b>↗</b></span></button>)}</div></section>
    <section className="cinema"><img src={IMG.night} alt="Tokyo nightlife" /><div><Eyebrow>AFTER HOURS</Eyebrow><h2>LATE NIGHTS.<br /><em>GOOD BITES.</em></h2><Button onClick={() => go('order')}>BOOK YOUR TABLE</Button></div></section>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true"><button className="lightbox-close" onClick={() => setLightbox(null)}>CLOSE ×</button><button aria-label="Previous image">←</button><img src={lightbox} alt="Expanded gallery view" /><button aria-label="Next image">→</button></div>}
  </>
}

function Order({ cart, update, remove }: { cart: { dish: Dish; qty: number }[]; update: (name: string, n: number) => void; remove: (name: string) => void }) {
  const [mode, setMode] = useState<'pickup' | 'delivery'>('pickup')
  const [confirmed, setConfirmed] = useState(false)
  const [reserved, setReserved] = useState(false)
  const total = cart.reduce((s, x) => s + x.dish.price * x.qty, 0)
  const submit = (e: FormEvent, kind: 'order' | 'reserve') => { e.preventDefault(); kind === 'order' ? setConfirmed(true) : setReserved(true) }
  return <>
    <PageHero eye="YOUR MOVE" title={<>YOUR NEXT FAVOURITE<br /><em>BITE IS WAITING.</em></>} copy="Grab a quick pickup, plan a dinner with friends, or make a night of it." mascot />
    <section className="order-section"><SectionTitle eye="ORDER ONLINE" title="BUILD YOUR FEAST." copy="Prototype checkout — no real order or payment will be submitted." />
      <div className="order-grid"><div className="cart-panel"><div className="toggle"><button className={mode === 'pickup' ? 'active' : ''} onClick={() => setMode('pickup')}>PICKUP</button><button className={mode === 'delivery' ? 'active' : ''} onClick={() => setMode('delivery')}>DELIVERY</button></div>
        {cart.length ? cart.map(x => <div className="cart-line" key={x.dish.name}><img src={x.dish.image} alt="" /><div><b>{x.dish.name}</b><small>€{x.dish.price.toFixed(2)} EACH</small><div className="qty"><button onClick={() => update(x.dish.name, -1)}>−</button><span>{x.qty}</span><button onClick={() => update(x.dish.name, 1)}>+</button></div></div><strong>€{(x.dish.price * x.qty).toFixed(2)}</strong><button onClick={() => remove(x.dish.name)}>×</button></div>) : <div className="empty"><Mascot small mood="hungry" /><h3>YOUR CART IS HUNGRY.</h3><p>Add something legendary from the menu.</p></div>}
        <div className="totals"><span>SUBTOTAL <b>€{total.toFixed(2)}</b></span><span>{mode === 'delivery' ? 'DELIVERY FEE' : 'PICKUP'} <b>{mode === 'delivery' ? '€3.50' : 'FREE'}</b></span><strong>ESTIMATED TOTAL <b>€{(total + (mode === 'delivery' ? 3.5 : 0)).toFixed(2)}</b></strong></div></div>
        <form className="form-card" onSubmit={e => submit(e, 'order')}><Eyebrow>YOUR DETAILS</Eyebrow>{confirmed ? <Confirmation title="FEAST REQUEST RECEIVED." copy="Prototype only — no real order has been placed." /> : <><div className="field-row"><Field label="FULL NAME" type="text" /><Field label="EMAIL" type="email" /></div><Field label="PHONE" type="tel" />{mode === 'delivery' && <Field label="DELIVERY ADDRESS" type="text" />}<label>ORDER NOTES<textarea placeholder="Sauce on the side, please…" /></label><Button type="submit">REVIEW ORDER</Button></>}</form></div></section>
    <section className="reservation"><div><Eyebrow>RESERVATIONS</Eyebrow><h2>GOOD FOOD.<br /><em>BETTER COMPANY.</em></h2><p>Choose your date, bring your people, and let us take care of the rest.</p><Mascot /></div>
      <form className="form-card" onSubmit={e => submit(e, 'reserve')}>{reserved ? <Confirmation title="TABLE REQUESTED." copy="Prototype confirmation only. A real booking requires restaurant approval." /> : <><div className="field-row"><Field label="FULL NAME" type="text" /><Field label="EMAIL ADDRESS" type="email" /></div><div className="field-row"><Field label="DATE" type="date" /><Field label="TIME" type="time" /></div><div className="field-row"><Field label="PHONE" type="tel" /><Field label="NUMBER OF GUESTS" type="number" /></div><label>OPTIONAL MESSAGE<textarea placeholder="Tell us what you're celebrating…" /></label><Button type="submit">REQUEST A TABLE</Button></>}</form></section>
    <section className="visit"><SectionTitle eye="FIND SUSHI CHAT" title="VISIT US." /><div className="visit-grid"><div><b>ADDRESS</b><p>9001 Av. des Acacias<br />L'Union, Occitanie<br />France</p></div><div><b>CONTACT</b><p>Contact Sushi Chat directly<br />for current details.</p></div><div><b>OPENING HOURS</b><p>Please check directly with<br />Sushi Chat for current hours.</p></div></div><div className="map"><span>9001 AV. DES ACACIAS, L'UNION</span><b>SUSHI<br />CHAT</b></div></section>
    <Faq />
  </>
}

function Field({ label, type }: { label: string; type: string }) { return <label>{label}<input required type={type} placeholder={type === 'email' ? 'you@email.com' : ''} /></label> }
function Confirmation({ title, copy }: { title: string; copy: string }) { return <div className="confirmation"><Mascot small mood="celebrating" /><h3>{title}</h3><p>{copy}</p></div> }
function Faq() {
  const [open, setOpen] = useState(0)
  const items = [['Do I need to reserve a table?', 'Walk-ins are welcome in this prototype, but reservations are recommended for busy evenings.'], ['Do you offer takeaway?', 'Yes. Choose pickup in the ordering prototype above.'], ['Are vegetarian options available?', 'Yes—look for the green VEG label.'], ['How can I check allergen information?', 'Final allergen details must always be confirmed directly with the restaurant.'], ['Can I change or cancel a reservation?', 'Contact the restaurant using the placeholder details above.']]
  return <section className="faq"><SectionTitle eye="NEED TO KNOW" title="FAQ. NO MYSTERY." /><div>{items.map((x, i) => <article key={x[0]}><button onClick={() => setOpen(open === i ? -1 : i)}><span>0{i + 1} / {x[0]}</span><b>{open === i ? '−' : '+'}</b></button>{open === i && <p>{x[1]}</p>}</article>)}</div></section>
}

function CartDrawer({ cart, close, update, remove, go }: { cart: { dish: Dish; qty: number }[]; close: () => void; update: (n: string, q: number) => void; remove: (n: string) => void; go: (p: Page) => void }) {
  const total = cart.reduce((s, x) => s + x.dish.price * x.qty, 0)
  return <div className="drawer-backdrop" onMouseDown={close}><aside className="drawer" onMouseDown={e => e.stopPropagation()}><div className="drawer-head"><Eyebrow>YOUR FEAST</Eyebrow><button onClick={close}>CLOSE ×</button></div><h2>CART / {cart.reduce((s, x) => s + x.qty, 0).toString().padStart(2, '0')}</h2>
    {cart.length ? <>{cart.map(x => <div className="cart-line" key={x.dish.name}><img src={x.dish.image} alt="" /><div><b>{x.dish.name}</b><div className="qty"><button onClick={() => update(x.dish.name, -1)}>−</button><span>{x.qty}</span><button onClick={() => update(x.dish.name, 1)}>+</button></div></div><strong>€{(x.dish.price * x.qty).toFixed(2)}</strong><button onClick={() => remove(x.dish.name)}>×</button></div>)}<div className="drawer-total">SUBTOTAL <b>€{total.toFixed(2)}</b></div><Button onClick={() => { go('order'); close() }}>CHECKOUT PROTOTYPE</Button></> : <div className="empty"><Mascot small mood="hungry" /><h3>NOTHING BUT CRUMBS.</h3><p>Your next obsession is one click away.</p></div>}</aside></div>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cart, setCart] = useState<{ dish: Dish; qty: number }[]>([])
  const [drawer, setDrawer] = useState(false)
  const count = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart])
  useEffect(() => { document.title = `${nav.find(n => n.id === page)?.label ?? 'Home'} | Sushi Chat, L'Union` }, [page])
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const add = (dish: Dish) => { setCart(c => c.some(x => x.dish.name === dish.name) ? c.map(x => x.dish.name === dish.name ? { ...x, qty: x.qty + 1 } : x) : [...c, { dish, qty: 1 }]); setDrawer(true) }
  const update = (name: string, n: number) => setCart(c => c.map(x => x.dish.name === name ? { ...x, qty: x.qty + n } : x).filter(x => x.qty > 0))
  const remove = (name: string) => setCart(c => c.filter(x => x.dish.name !== name))
  return <div className="app"><Header page={page} go={go} cartCount={count} openCart={() => setDrawer(true)} />
    {page === 'home' && <Home go={go} add={add} />}{page === 'menu' && <Menu add={add} />}{page === 'story' && <Story go={go} />}{page === 'gallery' && <Gallery go={go} />}{page === 'order' && <Order cart={cart} update={update} remove={remove} />}
    <Footer go={go} />{drawer && <CartDrawer cart={cart} close={() => setDrawer(false)} update={update} remove={remove} go={go} />}
  </div>
}
