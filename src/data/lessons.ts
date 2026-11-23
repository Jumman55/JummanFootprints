// The Math & Physics course: a trail of interactive lessons from π to ψ.
// Text supports $inline maths$, $$display maths$$ (own paragraph), **bold** and _italic_.
// Each step is revealed one at a time; a step with a quiz unlocks the next one when answered.

export type T = { en: string; bn: string };
export type Widget = 'circle' | 'polygon' | 'trig' | 'derivative' | 'complex' | 'string' | 'slit' | 'box' | 'packet';
export type Quiz =
  | { kind: 'choice'; q: T; options: { t: T; correct?: boolean }[]; explain: T }
  | { kind: 'number'; q: T; answer: number; tol: number; unit?: string; explain: T };
export interface Step { title?: T; body: T; widget?: Widget; quiz?: Quiz }
export interface Lesson {
  slug: string;
  stage: 1 | 2 | 3 | 4;
  kind: 'maths' | 'physics';
  minutes: number;
  title: T;
  standfirst: T;
  steps: Step[];
}

const r = String.raw;
const tx = (en: string, bn: string): T => ({ en, bn });

export const stages: { n: 1 | 2 | 3 | 4; title: T; formula: string }[] = [
  { n: 1, title: tx('Foundations', 'ভিত্তি'), formula: 'C = 2πr' },
  { n: 2, title: tx('Change and calculus', 'পরিবর্তন ও ক্যালকুলাস'), formula: 'dy/dx' },
  { n: 3, title: tx('Waves', 'তরঙ্গ'), formula: '∂²u/∂t² = c²∂²u/∂x²' },
  { n: 4, title: tx('Quantum mechanics', 'কোয়ান্টাম মেকানিক্স'), formula: 'iħ ∂ψ/∂t = Ĥψ' },
];

export const lessons: Lesson[] = [
  // ───────────────────────────── 1 · π ─────────────────────────────
  {
    slug: 'why-pi',
    stage: 1, kind: 'maths', minutes: 12,
    title: tx('Why π is in every circle', 'প্রতিটি বৃত্তে কেন π থাকে'),
    standfirst: tx(
      'Every circle, from a coin to a planet’s orbit, hides the same number. Roll one out and see why.',
      'মুদ্রা থেকে গ্রহের কক্ষপথ, প্রতিটি বৃত্তে লুকিয়ে আছে একই সংখ্যা। একটা বৃত্ত গড়িয়ে দেখুন কেন।'
    ),
    steps: [
      {
        title: tx('A shape with one rule', 'এক নিয়মের আকৃতি'),
        body: tx(
          r`A circle is made of every point that sits at the same distance from a centre. That distance is the **radius**, $r$. Straight across the circle, through the centre, is the **diameter**: $d = 2r$.`,
          r`একটি কেন্দ্র থেকে সমান দূরত্বে থাকা সব বিন্দু মিলে তৈরি হয় বৃত্ত। সেই দূরত্বের নাম **ব্যাসার্ধ**, $r$। কেন্দ্রের ভেতর দিয়ে বৃত্তের এক পাশ থেকে আরেক পাশ পর্যন্ত দূরত্ব হলো **ব্যাস**: $d = 2r$।`
        ),
        quiz: {
          kind: 'number',
          q: tx('A circle has radius 7 cm. What is its diameter?', 'একটি বৃত্তের ব্যাসার্ধ ৭ সেমি। এর ব্যাস কত?'),
          answer: 14, tol: 0.01, unit: 'cm',
          explain: tx(r`The diameter is twice the radius: $2 \times 7 = 14$ cm.`, r`ব্যাস হলো ব্যাসার্ধের দ্বিগুণ: $2 \times 7 = 14$ সেমি।`),
        },
      },
      {
        title: tx('Rolling it out', 'গড়িয়ে খুলে দেখা'),
        body: tx(
          r`The distance _around_ a circle is its **circumference**, $C$. A good way to measure it: put a mark on the rim and roll the circle along the ground for exactly one turn. The amber line it leaves behind is the circumference, laid out straight.

Roll the circle, then change its size and roll again. Watch the ticks: each one is one diameter.`,
          r`বৃত্তের _চারপাশের_ দূরত্বকে বলে **পরিধি**, $C$। এটা মাপার একটা সহজ উপায়: কিনারায় একটা দাগ দিয়ে বৃত্তটাকে মাটির ওপর ঠিক এক পাক গড়িয়ে দিন। পেছনে যে অ্যাম্বার রেখা পড়ে থাকে, সেটাই সোজা করে বিছানো পরিধি।

বৃত্তটা গড়িয়ে দিন, তারপর আকার বদলে আবার গড়ান। দাগগুলো খেয়াল করুন: প্রতিটি দাগ এক ব্যাস।`
        ),
        widget: 'circle',
      },
      {
        body: tx(
          r`Did you notice? Big circle or small, one full turn always covers **a little more than three diameters**. The ratio $C \div d$ does not change at all.`,
          r`খেয়াল করেছেন? বৃত্ত বড় হোক বা ছোট, এক পাক গড়ালে সবসময় **তিন ব্যাসের একটু বেশি** দূরত্ব যায়। $C \div d$ অনুপাতটি একটুও বদলায় না।`
        ),
        quiz: {
          kind: 'choice',
          q: tx('If you double the diameter of a wheel, its circumference…', 'একটি চাকার ব্যাস দ্বিগুণ করলে তার পরিধি…'),
          options: [
            { t: tx('stays the same', 'একই থাকে') },
            { t: tx('doubles', 'দ্বিগুণ হয়'), correct: true },
            { t: tx('becomes four times as long', 'চার গুণ হয়') },
          ],
          explain: tx(
            r`Because $C \div d$ is fixed, $C$ grows in step with $d$: double one, double the other.`,
            r`$C \div d$ যেহেতু স্থির, $C$ বাড়ে $d$-এর সাথে তাল মিলিয়ে: একটা দ্বিগুণ হলে অন্যটাও দ্বিগুণ।`
          ),
        },
      },
      {
        title: tx('The number π', 'π সংখ্যাটি'),
        body: tx(
          r`That fixed ratio has a name: the Greek letter **π** (pi).

$$\pi = \frac{C}{d} \approx 3.14159\ldots$$

So the circumference of any circle is $C = \pi d = 2\pi r$. π is _irrational_: its digits go on forever and never fall into a repeating pattern.`,
          r`এই স্থির অনুপাতের একটা নাম আছে: গ্রিক অক্ষর **π** (পাই)।

$$\pi = \frac{C}{d} \approx 3.14159\ldots$$

তাই যেকোনো বৃত্তের পরিধি $C = \pi d = 2\pi r$। π একটি _অমূলদ_ সংখ্যা: এর অঙ্ক অনন্তকাল চলতে থাকে, কখনো একই নকশায় ফিরে আসে না।`
        ),
        quiz: {
          kind: 'number',
          q: tx('A bicycle wheel is 70 cm across. How far does the bike move in one turn of the wheel? (nearest cm)', 'একটি সাইকেলের চাকার ব্যাস ৭০ সেমি। চাকা এক পাক ঘুরলে সাইকেল কতদূর যায়? (নিকটতম সেমি)'),
          answer: 220, tol: 0.6, unit: 'cm',
          explain: tx(r`$C = \pi d = 3.14159 \times 70 \approx 220$ cm.`, r`$C = \pi d = 3.14159 \times 70 \approx 220$ সেমি।`),
        },
      },
      {
        title: tx('Trapping π between polygons', 'বহুভুজের ফাঁদে π'),
        body: tx(
          r`More than 2,200 years ago, Archimedes had no calculator, so he trapped π. He drew a regular polygon _inside_ a circle of diameter 1 and another _outside_ it. The circle’s circumference must lie between the two perimeters.

With a hexagon, the inside perimeter is exactly 3, so π must be bigger than 3. Add more sides and the trap closes.`,
          r`২,২০০ বছরেরও আগে আর্কিমিডিসের কাছে কোনো ক্যালকুলেটর ছিল না, তাই তিনি π-কে ফাঁদে ফেলেছিলেন। ব্যাস ১ এমন একটি বৃত্তের _ভেতরে_ একটি সুষম বহুভুজ আঁকলেন, আরেকটি _বাইরে_। বৃত্তের পরিধি অবশ্যই দুই পরিসীমার মাঝখানে থাকবে।

ষড়ভুজ নিলে ভেতরের পরিসীমা ঠিক ৩, তাই π অবশ্যই ৩-এর চেয়ে বড়। বাহু বাড়ালে ফাঁদ আরও শক্ত হয়।`
        ),
        widget: 'polygon',
        quiz: {
          kind: 'choice',
          q: tx('Archimedes went up to 96 sides. What happens to the gap between the two perimeters as the number of sides grows?', 'আর্কিমিডিস ৯৬টি বাহু পর্যন্ত গিয়েছিলেন। বাহু বাড়লে দুই পরিসীমার মধ্যের ফাঁকের কী হয়?'),
          options: [
            { t: tx('It shrinks, squeezing π between them', 'ছোট হয়, π-কে দুটির মাঝে চেপে ধরে'), correct: true },
            { t: tx('It stays the same', 'একই থাকে') },
            { t: tx('It grows', 'বড় হয়') },
          ],
          explain: tx(
            r`With 96 sides he proved $3\tfrac{10}{71} < \pi < 3\tfrac{1}{7}$, which is π to about two decimal places.`,
            r`৯৬টি বাহু দিয়ে তিনি প্রমাণ করেন $3\tfrac{10}{71} < \pi < 3\tfrac{1}{7}$, অর্থাৎ প্রায় দুই দশমিক ঘর পর্যন্ত π।`
          ),
        },
      },
      {
        title: tx('The area of a circle', 'বৃত্তের ক্ষেত্রফল'),
        body: tx(
          r`π also gives the area. Slice a circle into many thin wedges, like a pizza, and lay them side by side, alternating point-up and point-down. They form almost a rectangle: its height is the radius $r$, and its length is half the circumference, $\pi r$.

$$A = \pi r \times r = \pi r^2$$`,
          r`ক্ষেত্রফলও আসে π থেকে। বৃত্তটাকে পিৎজার মতো অনেকগুলো সরু ফালিতে কাটুন, তারপর পাশাপাশি সাজান, একটার মাথা ওপরে আর পরেরটার নিচে। প্রায় একটা আয়তক্ষেত্র তৈরি হয়: উচ্চতা ব্যাসার্ধ $r$, আর দৈর্ঘ্য পরিধির অর্ধেক, $\pi r$।

$$A = \pi r \times r = \pi r^2$$`
        ),
        quiz: {
          kind: 'number',
          q: tx('What is the area of a circle with radius 10 m? (to the nearest whole number)', '১০ মিটার ব্যাসার্ধের একটি বৃত্তের ক্ষেত্রফল কত? (নিকটতম পূর্ণসংখ্যা)'),
          answer: 314, tol: 0.6, unit: 'm²',
          explain: tx(r`$A = \pi \times 10^2 = 100\pi \approx 314$ m².`, r`$A = \pi \times 10^2 = 100\pi \approx 314$ বর্গমিটার।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`Every circle has the same shape, so the ratio of circumference to diameter is the same for all of them. That ratio is π. It gives you $C = 2\pi r$ and $A = \pi r^2$, and in the next lesson it becomes the key to measuring angles and building waves.`,
          r`সব বৃত্তের আকৃতি একই, তাই পরিধি আর ব্যাসের অনুপাতও সবার জন্য এক। সেই অনুপাতই π। এ থেকে পাই $C = 2\pi r$ আর $A = \pi r^2$, আর পরের পাঠে এটাই হয়ে উঠবে কোণ মাপা আর তরঙ্গ তৈরির চাবি।`
        ),
      },
    ],
  },

  // ─────────────────────── 2 · Trigonometry ───────────────────────
  {
    slug: 'trigonometry-circle',
    stage: 1, kind: 'maths', minutes: 12,
    title: tx('Trigonometry from a walk around a circle', 'বৃত্তের চারপাশে হেঁটে ত্রিকোণমিতি'),
    standfirst: tx(
      'Sine and cosine are not triangle tricks. They are just where you are as you walk around a circle.',
      'সাইন আর কোসাইন ত্রিভুজের কোনো কৌশল নয়। বৃত্তের চারপাশে হাঁটতে হাঁটতে আপনি কোথায় আছেন, সেটাই।'
    ),
    steps: [
      {
        title: tx('A walk around the circle', 'বৃত্তের চারপাশে হাঁটা'),
        body: tx(
          r`Take a circle of radius 1, the **unit circle**. Start at the right-hand edge and walk anticlockwise. At any moment, your position depends only on the angle $\theta$ you have turned through.

Drag the point around and watch the two coloured lengths.`,
          r`ব্যাসার্ধ ১ এমন একটি বৃত্ত নিন, যার নাম **একক বৃত্ত**। ডান দিকের কিনারা থেকে শুরু করে ঘড়ির কাঁটার উল্টো দিকে হাঁটুন। যেকোনো মুহূর্তে আপনার অবস্থান নির্ভর করে শুধু আপনি কত কোণ $\theta$ ঘুরেছেন তার ওপর।

বিন্দুটি চারপাশে টেনে নিন আর রঙিন দুটি দৈর্ঘ্য লক্ষ্য করুন।`
        ),
        widget: 'trig',
      },
      {
        body: tx(
          r`Your distance across (left–right) is called the **cosine** of the angle, and your height (up–down) is the **sine**. So the point on the circle is simply

$$(\cos\theta,\ \sin\theta)$$`,
          r`আড়াআড়ি (বাঁ–ডান) দূরত্বকে বলে কোণটির **কোসাইন**, আর উচ্চতাকে (ওপর–নিচ) বলে **সাইন**। তাই বৃত্তের বিন্দুটি হলো সহজভাবে

$$(\cos\theta,\ \sin\theta)$$`
        ),
        quiz: {
          kind: 'choice',
          q: tx(r`After turning $90°$, where are you?`, r`$90°$ ঘোরার পর আপনি কোথায়?`),
          options: [
            { t: tx(r`$(1, 0)$`, r`$(1, 0)$`) },
            { t: tx(r`$(0, 1)$: straight up`, r`$(0, 1)$: ঠিক ওপরে`), correct: true },
            { t: tx(r`$(-1, 0)$`, r`$(-1, 0)$`) },
          ],
          explain: tx(r`A quarter turn takes you to the top: $\cos 90° = 0$, $\sin 90° = 1$.`, r`এক-চতুর্থাংশ ঘুরলে আপনি চূড়ায়: $\cos 90° = 0$, $\sin 90° = 1$।`),
        },
      },
      {
        title: tx('Pythagoras on the circle', 'বৃত্তে পিথাগোরাস'),
        body: tx(
          r`The centre, your position and the point straight below you make a right-angled triangle. Its long side is the radius, 1. Pythagoras’ theorem gives one of the most useful facts in maths:

$$\sin^2\theta + \cos^2\theta = 1$$`,
          r`কেন্দ্র, আপনার অবস্থান আর ঠিক নিচের বিন্দু মিলে একটা সমকোণী ত্রিভুজ। এর সবচেয়ে লম্বা বাহু ব্যাসার্ধ, ১। পিথাগোরাসের উপপাদ্য থেকে আসে গণিতের অন্যতম কাজের একটি সত্য:

$$\sin^2\theta + \cos^2\theta = 1$$`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`If $\cos\theta = 0.6$ and you are in the top-right quarter, what is $\sin\theta$?`, r`যদি $\cos\theta = 0.6$ হয় আর আপনি ওপরের ডান চতুর্থাংশে থাকেন, তাহলে $\sin\theta$ কত?`),
          answer: 0.8, tol: 0.005,
          explain: tx(r`$\sin^2\theta = 1 - 0.36 = 0.64$, so $\sin\theta = 0.8$.`, r`$\sin^2\theta = 1 - 0.36 = 0.64$, তাই $\sin\theta = 0.8$।`),
        },
      },
      {
        title: tx('Triangles of any size', 'যেকোনো আকারের ত্রিভুজ'),
        body: tx(
          r`Scale the unit circle up and everything scales with it. In a right-angled triangle whose long side (hypotenuse) is $h$:

$$\text{opposite} = h\sin\theta, \qquad \text{adjacent} = h\cos\theta$$

This is how surveyors measure mountains they cannot climb.`,
          r`একক বৃত্তকে বড় করলে সবকিছুই সেই অনুপাতে বড় হয়। একটি সমকোণী ত্রিভুজে, যার অতিভুজ $h$:

$$\text{বিপরীত বাহু} = h\sin\theta, \qquad \text{সন্নিহিত বাহু} = h\cos\theta$$

যে পাহাড়ে ওঠা যায় না, জরিপকারীরা এভাবেই তার উচ্চতা মাপেন।`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`A 10 m ladder leans against a wall at $30°$ to the ground. How high up the wall does it reach? ($\sin 30° = 0.5$)`, r`একটি ১০ মিটার মই মাটির সাথে $30°$ কোণে দেয়ালে হেলান দেওয়া। দেয়ালের কত উঁচুতে পৌঁছায়? ($\sin 30° = 0.5$)`),
          answer: 5, tol: 0.01, unit: 'm',
          explain: tx(r`Height $= 10 \times \sin 30° = 10 \times 0.5 = 5$ m.`, r`উচ্চতা $= 10 \times \sin 30° = 10 \times 0.5 = 5$ মিটার।`),
        },
      },
      {
        title: tx('Waves out of circles', 'বৃত্ত থেকে তরঙ্গ'),
        body: tx(
          r`Look at the right side of the diagram again: as you walk round and round, your height traces a smooth wave. That is why sine describes sound, light, tides and the vibrating strings of the next stage.

Mathematicians usually measure angles in **radians**: the distance walked around the unit circle. One full turn is the whole circumference, $2\pi$, so $360° = 2\pi$ radians.`,
          r`ছবির ডান দিকটা আবার দেখুন: বারবার ঘুরতে থাকলে আপনার উচ্চতা একটা মসৃণ তরঙ্গ আঁকে। এ কারণেই সাইন দিয়ে বর্ণনা করা যায় শব্দ, আলো, জোয়ার-ভাটা আর পরের ধাপের কম্পমান তার।

গণিতবিদরা সাধারণত কোণ মাপেন **রেডিয়ানে**: একক বৃত্তের চারপাশে কতটা পথ হাঁটলেন। পুরো এক পাক মানে পুরো পরিধি, $2\pi$, তাই $360° = 2\pi$ রেডিয়ান।`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`How many radians is $180°$? (2 decimal places)`, r`$180°$ সমান কত রেডিয়ান? (২ দশমিক ঘর)`),
          answer: 3.14, tol: 0.006,
          explain: tx(r`Half a turn is half of $2\pi$: exactly $\pi \approx 3.14$ radians.`, r`অর্ধেক পাক মানে $2\pi$-এর অর্ধেক: ঠিক $\pi \approx 3.14$ রেডিয়ান।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`$\cos\theta$ and $\sin\theta$ are the coordinates of a point walking around the unit circle. From that one picture you get $\sin^2\theta + \cos^2\theta = 1$, the side lengths of any right triangle, radians, and the shape of every wave.`,
          r`$\cos\theta$ আর $\sin\theta$ হলো একক বৃত্তে হাঁটা একটি বিন্দুর স্থানাঙ্ক। ওই এক ছবি থেকেই পাওয়া যায় $\sin^2\theta + \cos^2\theta = 1$, যেকোনো সমকোণী ত্রিভুজের বাহু, রেডিয়ান, আর প্রতিটি তরঙ্গের আকৃতি।`
        ),
      },
    ],
  },

  // ─────────────────────── 3 · Derivative ───────────────────────
  {
    slug: 'derivative',
    stage: 2, kind: 'maths', minutes: 12,
    title: tx('What is a derivative, really?', 'ডেরিভেটিভ আসলে কী?'),
    standfirst: tx(
      'How fast is something changing right now, at this exact instant? Calculus answers that with one clever limit.',
      'ঠিক এই মুহূর্তে কোনো কিছু কত দ্রুত বদলাচ্ছে? ক্যালকুলাস এর উত্তর দেয় একটি চমৎকার সীমা দিয়ে।'
    ),
    steps: [
      {
        title: tx('Speed at an instant', 'এক মুহূর্তের গতি'),
        body: tx(
          r`If a bus covers 120 km in 2 hours, its _average_ speed is 60 km/h. But a speedometer shows how fast you are going _right now_. How can you measure a speed over no time at all, when distance ÷ time would be $0 \div 0$?`,
          r`একটা বাস ২ ঘণ্টায় ১২০ কিমি গেলে তার _গড়_ গতি ঘণ্টায় ৬০ কিমি। কিন্তু স্পিডোমিটার দেখায় আপনি _এই মুহূর্তে_ কত জোরে চলছেন। শূন্য সময়ের গতি কীভাবে মাপবেন, যখন দূরত্ব ÷ সময় হয়ে যায় $0 \div 0$?`
        ),
      },
      {
        title: tx('The slope of a secant', 'ছেদক রেখার ঢাল'),
        body: tx(
          r`Take the curve $f(x) = x^2$. Pick a point $a$ and a second point a small step $h$ further along. The straight line through them, a **secant**, has slope

$$\frac{f(a+h) - f(a)}{h}$$

That is the average rate of change between the two points. Try it: drag the amber point, then shrink $h$.`,
          r`$f(x) = x^2$ বক্ররেখাটি নিন। একটি বিন্দু $a$ বেছে নিন, আর তার থেকে ছোট একটা ধাপ $h$ এগিয়ে আরেকটি বিন্দু। দুটির মধ্য দিয়ে যাওয়া সরলরেখা, একটি **ছেদক**, যার ঢাল

$$\frac{f(a+h) - f(a)}{h}$$

এটাই দুই বিন্দুর মধ্যে গড় পরিবর্তনের হার। চেষ্টা করুন: অ্যাম্বার বিন্দুটি টানুন, তারপর $h$ ছোট করুন।`
        ),
        widget: 'derivative',
      },
      {
        body: tx(
          r`For $x^2$ the algebra is short:

$$\frac{(a+h)^2 - a^2}{h} = \frac{2ah + h^2}{h} = 2a + h$$`,
          r`$x^2$-এর জন্য বীজগণিত ছোট্ট:

$$\frac{(a+h)^2 - a^2}{h} = \frac{2ah + h^2}{h} = 2a + h$$`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`With $a = 1$ and $h = 0.5$, what is the slope of the secant?`, r`$a = 1$ আর $h = 0.5$ হলে ছেদক রেখার ঢাল কত?`),
          answer: 2.5, tol: 0.001,
          explain: tx(r`$2a + h = 2 + 0.5 = 2.5$. Check it on the diagram.`, r`$2a + h = 2 + 0.5 = 2.5$। ছবিতে মিলিয়ে দেখুন।`),
        },
      },
      {
        title: tx('Let the gap shrink', 'ফাঁক ছোট হতে দিন'),
        body: tx(
          r`Now let $h$ get smaller and smaller, without ever being zero. The secant swings round until it just touches the curve: the **tangent**. Its slope is the **derivative**:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

For $x^2$, $2a + h$ heads to $2a$. So the derivative of $x^2$ is $2x$.`,
          r`এবার $h$-কে ছোট থেকে আরও ছোট হতে দিন, তবে কখনো শূন্য নয়। ছেদক রেখা ঘুরতে ঘুরতে শেষে বক্ররেখাকে কেবল ছুঁয়ে যায়: এটাই **স্পর্শক**। এর ঢালই **ডেরিভেটিভ**:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

$x^2$-এর জন্য $2a + h$ এগিয়ে যায় $2a$-এর দিকে। তাই $x^2$-এর ডেরিভেটিভ $2x$।`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`What is the slope of the tangent to $y = x^2$ at $x = 3$?`, r`$x = 3$ বিন্দুতে $y = x^2$-এর স্পর্শকের ঢাল কত?`),
          answer: 6, tol: 0.001,
          explain: tx(r`$f'(x) = 2x$, so $f'(3) = 6$.`, r`$f'(x) = 2x$, তাই $f'(3) = 6$।`),
        },
      },
      {
        title: tx('A shortcut for powers', 'ঘাতের জন্য শর্টকাট'),
        body: tx(
          r`Doing the same limit for other powers of $x$ gives a pattern called the **power rule**:

$$\frac{d}{dx}\,x^n = n\,x^{n-1}$$

Bring the power down in front, then reduce it by one.`,
          r`$x$-এর অন্য ঘাতের জন্যও একই সীমা করলে একটা নিয়ম পাওয়া যায়, যার নাম **ঘাতের নিয়ম**:

$$\frac{d}{dx}\,x^n = n\,x^{n-1}$$

ঘাতটা সামনে নামিয়ে আনুন, তারপর ঘাত এক কমিয়ে দিন।`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`What is the derivative of $x^3$ at $x = 2$?`, r`$x = 2$ বিন্দুতে $x^3$-এর ডেরিভেটিভ কত?`),
          answer: 12, tol: 0.001,
          explain: tx(r`$\frac{d}{dx}x^3 = 3x^2$, and $3 \times 2^2 = 12$.`, r`$\frac{d}{dx}x^3 = 3x^2$, আর $3 \times 2^2 = 12$।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`A derivative is a rate of change at a single instant: the slope of the tangent, found by letting the gap of a secant shrink to nothing. Physics is full of them. Velocity is the derivative of position, and the wave equation and the Schrödinger equation are both written in derivatives.`,
          r`ডেরিভেটিভ হলো একক মুহূর্তে পরিবর্তনের হার: স্পর্শকের ঢাল, যা পাওয়া যায় ছেদকের ফাঁক শূন্যের দিকে নিয়ে গিয়ে। পদার্থবিজ্ঞান এতে ভরা। বেগ হলো অবস্থানের ডেরিভেটিভ, আর তরঙ্গ সমীকরণ ও শ্রোডিঙ্গার সমীকরণ দুটোই লেখা হয় ডেরিভেটিভ দিয়ে।`
        ),
      },
    ],
  },

  // ─────────────────────── 4 · Complex numbers ───────────────────────
  {
    slug: 'complex-numbers',
    stage: 2, kind: 'maths', minutes: 14,
    title: tx('Complex numbers, without fear', 'ভয় ছাড়াই জটিল সংখ্যা'),
    standfirst: tx(
      'The “imaginary” number i is not imaginary at all. It is a quarter turn.',
      '“কাল্পনিক” সংখ্যা i মোটেও কাল্পনিক নয়। এটা আসলে এক-চতুর্থাংশ ঘূর্ণন।'
    ),
    steps: [
      {
        title: tx('A number that squares to −1', 'যে সংখ্যার বর্গ −১'),
        body: tx(
          r`Any real number squared is zero or positive, so no real number solves $x^2 = -1$. Mathematicians simply invented one and called it $i$:

$$i^2 = -1$$`,
          r`যেকোনো বাস্তব সংখ্যার বর্গ শূন্য বা ধনাত্মক, তাই কোনো বাস্তব সংখ্যা $x^2 = -1$-এর সমাধান নয়। গণিতবিদরা তাই একটা সংখ্যা উদ্ভাবন করলেন, নাম দিলেন $i$:

$$i^2 = -1$$`
        ),
        quiz: {
          kind: 'choice',
          q: tx(r`What is $i^3$?`, r`$i^3$ কত?`),
          options: [
            { t: tx(r`$i$`, r`$i$`) },
            { t: tx(r`$-1$`, r`$-1$`) },
            { t: tx(r`$-i$`, r`$-i$`), correct: true },
            { t: tx(r`$1$`, r`$1$`) },
          ],
          explain: tx(r`$i^3 = i^2 \times i = -1 \times i = -i$.`, r`$i^3 = i^2 \times i = -1 \times i = -i$।`),
        },
      },
      {
        title: tx('A second direction', 'দ্বিতীয় একটি দিক'),
        body: tx(
          r`Real numbers live on a line. A **complex number** $z = a + bi$ needs two: its real part $a$ goes left–right, and its imaginary part $b$ goes up–down. So every complex number is a point, or an arrow, on a flat plane.

Drag $z$ and watch the blue arrow.`,
          r`বাস্তব সংখ্যা থাকে একটি রেখার ওপর। একটি **জটিল সংখ্যা** $z = a + bi$-এর দরকার দুটি দিক: বাস্তব অংশ $a$ বাঁ–ডানে, আর কাল্পনিক অংশ $b$ ওপর–নিচে। তাই প্রতিটি জটিল সংখ্যা একটি সমতলের ওপর একটি বিন্দু বা একটি তীর।

$z$ টেনে সরান আর নীল তীরটি দেখুন।`
        ),
        widget: 'complex',
      },
      {
        title: tx('Multiplying by i is a quarter turn', 'i দিয়ে গুণ মানে এক-চতুর্থাংশ ঘূর্ণন'),
        body: tx(
          r`Multiply out $i(a + bi) = ai + bi^2 = -b + ai$. On the plane, the point $(a, b)$ has moved to $(-b, a)$: it has turned exactly $90°$ anticlockwise. Do it twice and you turn $180°$, pointing the opposite way. That is all $i^2 = -1$ means.`,
          r`গুণ করে দেখুন: $i(a + bi) = ai + bi^2 = -b + ai$। সমতলে $(a, b)$ বিন্দুটি সরে গেছে $(-b, a)$-তে: ঠিক $90°$ ঘড়ির কাঁটার উল্টো দিকে ঘুরেছে। দুবার করলে ঘোরে $180°$, একেবারে উল্টো দিকে। $i^2 = -1$ মানে কেবল এটুকুই।`
        ),
        quiz: {
          kind: 'choice',
          q: tx(r`Start at $3$ and multiply by $i$ twice. Where do you end up?`, r`$3$ থেকে শুরু করে দুবার $i$ দিয়ে গুণ করুন। শেষে কোথায় পৌঁছান?`),
          options: [
            { t: tx(r`$3i$`, r`$3i$`) },
            { t: tx(r`$-3$`, r`$-3$`), correct: true },
            { t: tx(r`$9$`, r`$9$`) },
          ],
          explain: tx(r`Two quarter turns make a half turn: $3 \to 3i \to -3$.`, r`দুটি এক-চতুর্থাংশ ঘূর্ণন মিলে অর্ধেক ঘূর্ণন: $3 \to 3i \to -3$।`),
        },
      },
      {
        title: tx('Size and angle', 'আকার ও কোণ'),
        body: tx(
          r`Every complex number has a size, its distance from 0, and an angle. The size comes from Pythagoras:

$$|a + bi| = \sqrt{a^2 + b^2}$$

The beautiful rule: when you multiply two complex numbers, their **sizes multiply** and their **angles add**.`,
          r`প্রতিটি জটিল সংখ্যার একটা আকার আছে, অর্থাৎ ০ থেকে তার দূরত্ব, আর একটা কোণ। আকার আসে পিথাগোরাস থেকে:

$$|a + bi| = \sqrt{a^2 + b^2}$$

সুন্দর নিয়মটি হলো: দুটি জটিল সংখ্যা গুণ করলে তাদের **আকার গুণ হয়** আর **কোণ যোগ হয়**।`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`What is the size of $3 + 4i$?`, r`$3 + 4i$-এর আকার কত?`),
          answer: 5, tol: 0.001,
          explain: tx(r`$\sqrt{3^2 + 4^2} = \sqrt{25} = 5$.`, r`$\sqrt{3^2 + 4^2} = \sqrt{25} = 5$।`),
        },
      },
      {
        title: tx('Euler’s formula', 'অয়লারের সূত্র'),
        body: tx(
          r`Remember the walk around the unit circle? Complex numbers turn it into one formula:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

As $\theta$ grows, $e^{i\theta}$ walks around the unit circle. Put in half a turn, $\theta = \pi$, and you get the famous $e^{i\pi} + 1 = 0$.`,
          r`একক বৃত্তের চারপাশে হাঁটার কথা মনে আছে? জটিল সংখ্যা সেটাকে একটি সূত্রে পরিণত করে:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

$\theta$ বাড়ার সাথে সাথে $e^{i\theta}$ একক বৃত্তের চারপাশে হাঁটে। অর্ধেক পাক, $\theta = \pi$, বসালে পাওয়া যায় বিখ্যাত $e^{i\pi} + 1 = 0$।`
        ),
        quiz: {
          kind: 'choice',
          q: tx(r`What is $e^{i\pi/2}$, a quarter turn?`, r`$e^{i\pi/2}$, অর্থাৎ এক-চতুর্থাংশ পাক, কত?`),
          options: [
            { t: tx(r`$1$`, r`$1$`) },
            { t: tx(r`$i$`, r`$i$`), correct: true },
            { t: tx(r`$-1$`, r`$-1$`) },
          ],
          explain: tx(r`$\cos\frac{\pi}{2} + i\sin\frac{\pi}{2} = 0 + i = i$: straight up.`, r`$\cos\frac{\pi}{2} + i\sin\frac{\pi}{2} = 0 + i = i$: ঠিক ওপরে।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`Complex numbers are points on a plane; multiplying by $i$ turns them a quarter turn, and $e^{i\theta}$ walks the unit circle. Quantum mechanics is written in them: the wave function $\psi$ is complex, and its turning angle, its _phase_, is what makes interference happen.`,
          r`জটিল সংখ্যা হলো সমতলের বিন্দু; $i$ দিয়ে গুণ করলে সেগুলো এক-চতুর্থাংশ ঘোরে, আর $e^{i\theta}$ একক বৃত্তে হাঁটে। কোয়ান্টাম মেকানিক্স এদের ভাষাতেই লেখা: তরঙ্গ ফাংশন $\psi$ জটিল, আর তার ঘূর্ণনের কোণ, অর্থাৎ _দশা_, থেকেই ব্যতিচার ঘটে।`
        ),
      },
    ],
  },

  // ─────────────────────── 5 · Wave equation ───────────────────────
  {
    slug: 'wave-equation',
    stage: 3, kind: 'physics', minutes: 12,
    title: tx('The wave equation, from a guitar string', 'গিটারের তার থেকে তরঙ্গ সমীকরণ'),
    standfirst: tx(
      'Pluck a string and it can only sing certain notes. That simple fact leads all the way to quantum physics.',
      'একটা তারে টোকা দিলে সেটা কেবল নির্দিষ্ট কিছু সুরেই বাজে। এই সহজ সত্যটি আমাদের নিয়ে যায় কোয়ান্টাম পদার্থবিজ্ঞান পর্যন্ত।'
    ),
    steps: [
      {
        title: tx('Pinned at both ends', 'দুই প্রান্তে আটকানো'),
        body: tx(
          r`A guitar string is held fixed at the nut and at the bridge. When you pluck it, waves run back and forth and pile up into a **standing wave**: a pattern that wobbles in place.

Change $n$, play the note, and count the still points, the **nodes**.`,
          r`গিটারের তার নাট আর ব্রিজে শক্ত করে আটকানো। টোকা দিলে তরঙ্গ সামনে-পেছনে ছুটে মিলে তৈরি করে একটি **স্থির তরঙ্গ**: এমন একটা নকশা যা এক জায়গায় দাঁড়িয়ে দোলে।

$n$ বদলান, সুরটা বাজিয়ে শুনুন, আর স্থির বিন্দুগুলো, অর্থাৎ **নোড**, গুনে দেখুন।`
        ),
        widget: 'string',
      },
      {
        title: tx('Only some waves fit', 'কেবল কিছু তরঙ্গই আঁটে'),
        body: tx(
          r`Both ends must stay still, so the string has to hold a whole number of half-wavelengths. For a string of length $L$, the allowed wavelengths are

$$\lambda_n = \frac{2L}{n}, \qquad n = 1, 2, 3, \ldots$$`,
          r`দুই প্রান্ত স্থির থাকতেই হবে, তাই তারটিতে পূর্ণসংখ্যক অর্ধ-তরঙ্গদৈর্ঘ্য আঁটতে হয়। দৈর্ঘ্য $L$ এমন তারের জন্য অনুমোদিত তরঙ্গদৈর্ঘ্য

$$\lambda_n = \frac{2L}{n}, \qquad n = 1, 2, 3, \ldots$$`
        ),
        quiz: {
          kind: 'number',
          q: tx('A guitar string is 0.65 m long. What is the wavelength of its lowest note (n = 1)?', 'একটি গিটারের তার ০.৬৫ মিটার লম্বা। এর সবচেয়ে নিচু সুরের (n = 1) তরঙ্গদৈর্ঘ্য কত?'),
          answer: 1.3, tol: 0.005, unit: 'm',
          explain: tx(r`$\lambda_1 = 2L = 2 \times 0.65 = 1.3$ m: half a wave fills the string.`, r`$\lambda_1 = 2L = 2 \times 0.65 = 1.3$ মিটার: অর্ধেক তরঙ্গ পুরো তারটা ভরে দেয়।`),
        },
      },
      {
        title: tx('Harmonics', 'হারমোনিক'),
        body: tx(
          r`Waves on the string travel at a speed $v$, and frequency is speed divided by wavelength:

$$f_n = \frac{v}{\lambda_n} = n \cdot \frac{v}{2L} = n f_1$$

So the allowed notes are whole-number multiples of the lowest one. On a guitar’s open A string, $f_1 = 110$ Hz.`,
          r`তারে তরঙ্গ চলে $v$ বেগে, আর কম্পাঙ্ক হলো বেগকে তরঙ্গদৈর্ঘ্য দিয়ে ভাগ:

$$f_n = \frac{v}{\lambda_n} = n \cdot \frac{v}{2L} = n f_1$$

তাই অনুমোদিত সুরগুলো হলো সবচেয়ে নিচু সুরের পূর্ণসংখ্যা গুণিতক। গিটারের খোলা A তারে $f_1 = 110$ হার্জ।`
        ),
        quiz: {
          kind: 'number',
          q: tx('What is the frequency of the third harmonic (n = 3) of the A string?', 'A তারের তৃতীয় হারমোনিকের (n = 3) কম্পাঙ্ক কত?'),
          answer: 330, tol: 0.5, unit: 'Hz',
          explain: tx(r`$f_3 = 3 \times 110 = 330$ Hz. Press “Hear it” with $n = 3$.`, r`$f_3 = 3 \times 110 = 330$ হার্জ। $n = 3$ রেখে “শুনুন” চাপুন।`),
        },
      },
      {
        title: tx('The equation', 'সমীকরণটি'),
        body: tx(
          r`Why does the string move like this? Each tiny piece is pulled by its neighbours, and the more the string is curved at a point, the harder that piece is pulled back. Written with derivatives, that is the **wave equation**:

$$\frac{\partial^2 u}{\partial t^2} = c^2\,\frac{\partial^2 u}{\partial x^2}$$

Left: how fast the piece accelerates. Right: how curved the string is there. The wave speed is $c = \sqrt{T/\mu}$, where $T$ is the tension and $\mu$ the mass per metre.`,
          r`তারটা এভাবে নড়ে কেন? প্রতিটি ছোট্ট টুকরোকে টানে তার পাশের টুকরোগুলো, আর কোনো বিন্দুতে তার যত বেশি বাঁকা, সেই টুকরো তত জোরে পেছনে টান খায়। ডেরিভেটিভ দিয়ে লিখলে এটাই **তরঙ্গ সমীকরণ**:

$$\frac{\partial^2 u}{\partial t^2} = c^2\,\frac{\partial^2 u}{\partial x^2}$$

বাঁয়ে: টুকরোটি কত দ্রুত ত্বরিত হচ্ছে। ডানে: সেখানে তারটি কতটা বাঁকা। তরঙ্গের বেগ $c = \sqrt{T/\mu}$, যেখানে $T$ টান আর $\mu$ প্রতি মিটারের ভর।`
        ),
        quiz: {
          kind: 'choice',
          q: tx('You tighten the tuning peg, raising the tension T. What happens to the note?', 'টিউনিং পেগ ঘুরিয়ে টান T বাড়ালেন। সুরের কী হয়?'),
          options: [
            { t: tx('It goes up', 'চড়া হয়'), correct: true },
            { t: tx('It goes down', 'নিচু হয়') },
            { t: tx('It stays the same', 'একই থাকে') },
          ],
          explain: tx(r`More tension means a faster wave speed $c$, and $f_1 = c/2L$ rises with it.`, r`টান বেশি মানে তরঙ্গের বেগ $c$ বেশি, আর তার সাথে $f_1 = c/2L$ বাড়ে।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`A wave trapped between two fixed ends can only take certain shapes, so only certain frequencies are allowed. Keep this idea: when we trap an electron in a box in Stage 4, the very same rule will force its energy into steps.`,
          r`দুই স্থির প্রান্তের মাঝে আটকা পড়া তরঙ্গ কেবল নির্দিষ্ট কিছু আকার নিতে পারে, তাই কেবল নির্দিষ্ট কম্পাঙ্কই অনুমোদিত। ধারণাটা মনে রাখুন: চতুর্থ ধাপে যখন একটি ইলেকট্রনকে বাক্সে আটকাব, ঠিক এই নিয়মই তার শক্তিকে ধাপে ধাপে বেঁধে দেবে।`
        ),
      },
    ],
  },

  // ─────────────────────── 6 · Double slit ───────────────────────
  {
    slug: 'double-slit',
    stage: 3, kind: 'physics', minutes: 12,
    title: tx('Interference and the double slit', 'ব্যতিচার আর ডাবল স্লিট'),
    standfirst: tx(
      'Two waves can add up to more, or cancel to nothing. This is the experiment that revealed light, and matter, to be waves.',
      'দুটি তরঙ্গ মিলে বড় হতে পারে, আবার একে অন্যকে মুছেও দিতে পারে। এই পরীক্ষাই দেখিয়েছিল আলো, আর পদার্থও, তরঙ্গ।'
    ),
    steps: [
      {
        title: tx('Two stones in a pond', 'পুকুরে দুটি ঢিল'),
        body: tx(
          r`Throw two stones into a still pond and their ripples cross. Where they overlap, the water height is simply the **sum** of the two waves. Light passing through two narrow slits does the same.

Watch the waves spread from the slits on the left, then change the wavelength and the gap.`,
          r`শান্ত পুকুরে দুটি ঢিল ছুড়ুন, তাদের ঢেউ একটা আরেকটাকে পার হয়ে যায়। যেখানে মিলে যায়, সেখানে পানির উচ্চতা হলো দুই তরঙ্গের **যোগফল**। দুটি সরু চিড়ের মধ্য দিয়ে যাওয়া আলোও ঠিক তাই করে।

বাঁ দিকের চিড় থেকে তরঙ্গ ছড়িয়ে পড়া দেখুন, তারপর তরঙ্গদৈর্ঘ্য আর ফাঁক বদলান।`
        ),
        widget: 'slit',
      },
      {
        title: tx('Bright and dark', 'উজ্জ্বল আর অন্ধকার'),
        body: tx(
          r`At each point on the screen, the two waves have travelled slightly different distances. If the difference is a whole number of wavelengths, crest meets crest: **bright** (constructive interference). If it is a whole number _plus a half_, crest meets trough and they cancel: **dark** (destructive interference).`,
          r`পর্দার প্রতিটি বিন্দুতে দুটি তরঙ্গ সামান্য ভিন্ন দূরত্ব পেরিয়ে আসে। পার্থক্যটা পূর্ণসংখ্যক তরঙ্গদৈর্ঘ্য হলে চূড়ায় চূড়ায় মেলে: **উজ্জ্বল** (গঠনমূলক ব্যতিচার)। পূর্ণসংখ্যা _আর অর্ধেক_ হলে চূড়া মেলে খাঁজের সাথে, একে অন্যকে মুছে দেয়: **অন্ধকার** (ধ্বংসাত্মক ব্যতিচার)।`
        ),
        quiz: {
          kind: 'choice',
          q: tx('At a point on the screen, one wave has travelled exactly half a wavelength further than the other. What do you see?', 'পর্দার একটি বিন্দুতে একটি তরঙ্গ অন্যটির চেয়ে ঠিক অর্ধেক তরঙ্গদৈর্ঘ্য বেশি পথ এসেছে। কী দেখবেন?'),
          options: [
            { t: tx('A bright fringe', 'উজ্জ্বল ঝালর') },
            { t: tx('A dark fringe', 'অন্ধকার ঝালর'), correct: true },
            { t: tx('Half brightness', 'অর্ধেক উজ্জ্বলতা') },
          ],
          explain: tx('Half a wavelength out of step means crest meets trough, and they cancel.', 'অর্ধেক তরঙ্গদৈর্ঘ্য পিছিয়ে থাকা মানে চূড়া মেলে খাঁজের সাথে, আর তারা একে অন্যকে মুছে দেয়।'),
        },
      },
      {
        title: tx('How far apart are the fringes?', 'ঝালরগুলো কত দূরে দূরে?'),
        body: tx(
          r`For slits a distance $d$ apart and a screen a distance $L$ away (much larger than $d$), the bright fringes are spaced by

$$\Delta y = \frac{\lambda L}{d}$$

Try it on the diagram: longer waves or closer slits spread the pattern out.`,
          r`চিড় দুটির দূরত্ব $d$ আর পর্দা $L$ দূরে থাকলে (যেখানে $L$ অনেক বড়), উজ্জ্বল ঝালরগুলোর মধ্যে ফাঁক

$$\Delta y = \frac{\lambda L}{d}$$

ছবিতে চেষ্টা করুন: তরঙ্গ লম্বা হলে বা চিড় কাছাকাছি হলে নকশাটা ছড়িয়ে যায়।`
        ),
        quiz: {
          kind: 'number',
          q: tx('Green light (λ = 500 nm) passes through slits 0.1 mm apart onto a screen 1 m away. How far apart are the bright fringes, in mm?', 'সবুজ আলো (λ = ৫০০ ন্যানোমিটার) ০.১ মিমি দূরত্বের চিড় দিয়ে ১ মিটার দূরের পর্দায় পড়ছে। উজ্জ্বল ঝালরগুলোর ফাঁক কত মিলিমিটার?'),
          answer: 5, tol: 0.05, unit: 'mm',
          explain: tx(r`$\Delta y = \frac{500\times10^{-9} \times 1}{0.1\times10^{-3}} = 5\times10^{-3}$ m $= 5$ mm.`, r`$\Delta y = \frac{500\times10^{-9} \times 1}{0.1\times10^{-3}} = 5\times10^{-3}$ মিটার $= 5$ মিমি।`),
        },
      },
      {
        title: tx('One particle at a time', 'একবারে একটি কণা'),
        body: tx(
          r`Now the strange part. Fire **electrons** at two slits, so slowly that only one is in flight at a time. Each one lands as a single dot. Yet after thousands of dots, the same striped interference pattern appears.

Each electron behaves like a wave that passes through _both_ slits and interferes with itself. The wave tells us where it is _likely_ to land. That wave is the subject of Stage 4.`,
          r`এবার অদ্ভুত অংশ। দুটি চিড়ের দিকে **ইলেকট্রন** ছুড়ুন, এত ধীরে যে একসাথে মাত্র একটি পথে থাকে। প্রতিটি একটি বিন্দু হয়ে পড়ে। তবু হাজার হাজার বিন্দুর পর সেই একই ডোরাকাটা ব্যতিচারের নকশা ফুটে ওঠে।

প্রতিটি ইলেকট্রন এমন একটি তরঙ্গের মতো আচরণ করে, যা _দুটি_ চিড় দিয়েই যায় আর নিজের সাথেই ব্যতিচার ঘটায়। তরঙ্গটি বলে দেয় কণাটি কোথায় পড়ার _সম্ভাবনা_ বেশি। এই তরঙ্গই চতুর্থ ধাপের বিষয়।`
        ),
        quiz: {
          kind: 'choice',
          q: tx('Electrons sent one at a time still build up stripes. What does that tell us?', 'একবারে একটি করে পাঠানো ইলেকট্রনও ডোরা তৈরি করে। এ থেকে কী বোঝা যায়?'),
          options: [
            { t: tx('Electrons bump into each other', 'ইলেকট্রনগুলো একে অন্যের সাথে ধাক্কা খায়') },
            { t: tx('Each electron behaves like a wave going through both slits', 'প্রতিটি ইলেকট্রন দুটি চিড় দিয়ে যাওয়া তরঙ্গের মতো আচরণ করে'), correct: true },
            { t: tx('The slits are too wide', 'চিড়গুলো খুব চওড়া') },
          ],
          explain: tx('There is nothing else for each electron to interfere with, so it must interfere with itself.', 'প্রতিটি ইলেকট্রনের ব্যতিচার ঘটানোর মতো আর কিছু নেই, তাই সে নিজের সাথেই ব্যতিচার ঘটায়।'),
        },
      },
    ],
  },

  // ─────────────────────── 7 · Schrödinger ───────────────────────
  {
    slug: 'schrodinger-equation',
    stage: 4, kind: 'physics', minutes: 15,
    title: tx('The Schrödinger equation, slowly', 'শ্রোডিঙ্গার সমীকরণ, ধীরে ধীরে'),
    standfirst: tx(
      'One line of maths that tells you how the quantum world changes in time. Let’s take it apart piece by piece.',
      'গণিতের একটি লাইন, যা বলে দেয় কোয়ান্টাম জগৎ সময়ের সাথে কীভাবে বদলায়। চলুন একে টুকরো টুকরো করে খুলে দেখি।'
    ),
    steps: [
      {
        title: tx('The big idea', 'মূল ধারণা'),
        body: tx(
          r`In everyday physics, Newton’s law $F = ma$ tells you how a ball’s position changes. In quantum mechanics a particle doesn’t have one sharp position. Instead it is described by a _wave function_, written $\psi(x, t)$, and the Schrödinger equation tells you how that wave changes over time.`,
          r`দৈনন্দিন পদার্থবিজ্ঞানে নিউটনের সূত্র $F = ma$ বলে দেয় একটা বলের অবস্থান কীভাবে বদলায়। কিন্তু কোয়ান্টাম মেকানিক্সে একটি কণার একটি নির্দিষ্ট অবস্থান থাকে না। তার বদলে কণাটিকে বর্ণনা করা হয় একটি _তরঙ্গ ফাংশন_ দিয়ে, যাকে লেখা হয় $\psi(x, t)$, আর শ্রোডিঙ্গার সমীকরণ বলে দেয় সেই তরঙ্গ সময়ের সাথে কীভাবে বদলায়।`
        ),
      },
      {
        title: tx('The equation', 'সমীকরণটি'),
        body: tx(
          r`For one particle of mass $m$ moving along a line, with potential energy $V(x)$:

$$i\hbar\,\frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m}\,\frac{\partial^2 \psi}{\partial x^2} + V(x)\,\psi$$

Here $\hbar = h/2\pi \approx 1.055 \times 10^{-34}$ J·s is the reduced Planck constant. It is tiny, which is why we don’t notice quantum effects in daily life. And there is $i$ from Stage 2: the wave function is a complex number.`,
          r`একটি সরলরেখা বরাবর চলা $m$ ভরের একটি কণার জন্য, যার স্থিতিশক্তি $V(x)$:

$$i\hbar\,\frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m}\,\frac{\partial^2 \psi}{\partial x^2} + V(x)\,\psi$$

এখানে $\hbar = h/2\pi \approx 1.055 \times 10^{-34}$ J·s হলো হ্রাসকৃত প্ল্যাঙ্ক ধ্রুবক। এটা এতই ক্ষুদ্র যে দৈনন্দিন জীবনে আমরা কোয়ান্টাম প্রভাব টের পাই না। আর এখানে আছে দ্বিতীয় ধাপের $i$: তরঙ্গ ফাংশন একটি জটিল সংখ্যা।`
        ),
      },
      {
        title: tx('Term by term', 'প্রতিটি পদ'),
        body: tx(
          r`**Left side**, $i\hbar\,\partial\psi/\partial t$: how fast the wave function is changing in time.

**First term on the right**, $-\frac{\hbar^2}{2m}\,\partial^2\psi/\partial x^2$: the kinetic energy. It is a curvature, just like in the wave equation: the more sharply the wave bends, the more kinetic energy it carries.

**Last term**, $V(x)\psi$: the potential energy, like a valley the particle sits in.`,
          r`**বাঁ দিক**, $i\hbar\,\partial\psi/\partial t$: তরঙ্গ ফাংশন সময়ের সাথে কত দ্রুত বদলাচ্ছে।

**ডান দিকের প্রথম পদ**, $-\frac{\hbar^2}{2m}\,\partial^2\psi/\partial x^2$: গতিশক্তি। এটা একটা বক্রতা, ঠিক তরঙ্গ সমীকরণের মতো: তরঙ্গ যত তীক্ষ্ণভাবে বাঁকে, তার গতিশক্তি তত বেশি।

**শেষ পদ**, $V(x)\psi$: স্থিতিশক্তি, যেন একটা উপত্যকা, যার মধ্যে কণাটি বসে আছে।`
        ),
        quiz: {
          kind: 'choice',
          q: tx(r`Which term measures the particle’s kinetic energy?`, r`কোন পদটি কণার গতিশক্তি মাপে?`),
          options: [
            { t: tx(r`$V(x)\psi$`, r`$V(x)\psi$`) },
            { t: tx(r`$-\frac{\hbar^2}{2m}\frac{\partial^2\psi}{\partial x^2}$, the curvature`, r`$-\frac{\hbar^2}{2m}\frac{\partial^2\psi}{\partial x^2}$, বক্রতা`), correct: true },
            { t: tx(r`$i\hbar\frac{\partial\psi}{\partial t}$`, r`$i\hbar\frac{\partial\psi}{\partial t}$`) },
          ],
          explain: tx('A wave that wiggles more tightly has a shorter wavelength, more momentum and more kinetic energy.', 'যে তরঙ্গ ঘন ঘন বাঁকে, তার তরঙ্গদৈর্ঘ্য ছোট, ভরবেগ বেশি আর গতিশক্তিও বেশি।'),
        },
      },
      {
        title: tx('A particle in a box', 'বাক্সে আটকানো কণা'),
        body: tx(
          r`Trap a particle between two walls it cannot pass. Just like the guitar string, $\psi$ must be zero at both walls, so only whole numbers of half-waves fit:

$$\psi_n(x) = \sin\!\left(\frac{n\pi x}{L}\right), \qquad E_n = n^2\,\frac{h^2}{8mL^2}$$

The energy cannot take any value it likes. It comes in steps: it is **quantised**.`,
          r`এমন দুটি দেয়ালের মাঝে একটি কণাকে আটকান, যা সে পার হতে পারে না। ঠিক গিটারের তারের মতো দুই দেয়ালে $\psi$ শূন্য হতে হবে, তাই কেবল পূর্ণসংখ্যক অর্ধ-তরঙ্গই আঁটে:

$$\psi_n(x) = \sin\!\left(\frac{n\pi x}{L}\right), \qquad E_n = n^2\,\frac{h^2}{8mL^2}$$

শক্তি যেকোনো মান নিতে পারে না। তা আসে ধাপে ধাপে: এটা **কোয়ান্টায়িত**।`
        ),
        widget: 'box',
        quiz: {
          kind: 'number',
          q: tx(r`How many times bigger than the lowest energy $E_1$ is the energy of level $n = 3$?`, r`$n = 3$ স্তরের শক্তি সর্বনিম্ন শক্তি $E_1$-এর কত গুণ?`),
          answer: 9, tol: 0.001,
          explain: tx(r`$E_n \propto n^2$, so $E_3 = 3^2 E_1 = 9E_1$.`, r`$E_n \propto n^2$, তাই $E_3 = 3^2 E_1 = 9E_1$।`),
        },
      },
      {
        title: tx('What ψ means', 'ψ মানে কী'),
        body: tx(
          r`The wave function itself isn’t something you can measure. Its squared size, $|\psi|^2$, gives the **probability** of finding the particle near a point $x$: the shaded area in the diagram. Because the particle has to be somewhere, all those probabilities add up to one:

$$\int_{-\infty}^{\infty} |\psi|^2 \, dx = 1$$`,
          r`তরঙ্গ ফাংশন নিজে এমন কিছু নয় যা মাপা যায়। তার মানের বর্গ, $|\psi|^2$, বলে দেয় কোনো বিন্দু $x$-এর কাছে কণাটিকে পাওয়ার **সম্ভাবনা**: ছবির ছায়া দেওয়া অংশটি। কণাটিকে যেহেতু কোথাও না কোথাও থাকতেই হবে, সব সম্ভাবনা যোগ করলে হয় এক:

$$\int_{-\infty}^{\infty} |\psi|^2 \, dx = 1$$`
        ),
        quiz: {
          kind: 'number',
          q: tx(r`In level $n = 2$, how many points _inside_ the box (not counting the walls) have zero chance of finding the particle?`, r`$n = 2$ স্তরে বাক্সের _ভেতরে_ (দেয়াল বাদে) কয়টি বিন্দুতে কণাটিকে পাওয়ার সম্ভাবনা শূন্য?`),
          answer: 1, tol: 0.001,
          explain: tx(r`There is one node in the middle: $\psi_2 = 0$ at $x = L/2$, so $|\psi_2|^2 = 0$ there.`, r`মাঝখানে একটি নোড আছে: $x = L/2$-এ $\psi_2 = 0$, তাই সেখানে $|\psi_2|^2 = 0$।`),
        },
      },
      {
        title: tx('What you’ve learned', 'যা শিখলেন'),
        body: tx(
          r`The Schrödinger equation is a wave equation for a complex wave $\psi$. Trap that wave and its energy comes in steps; square its size and you get the odds of where the particle is. That is why atoms have sharp energy levels, and why their light comes in sharp colours.`,
          r`শ্রোডিঙ্গার সমীকরণ হলো একটি জটিল তরঙ্গ $\psi$-এর তরঙ্গ সমীকরণ। তরঙ্গটিকে আটকালে তার শক্তি আসে ধাপে ধাপে; তার আকারের বর্গ নিলে পাওয়া যায় কণাটি কোথায় থাকার সম্ভাবনা। এ কারণেই পরমাণুর শক্তিস্তর নির্দিষ্ট, আর তাদের আলোর রংও নির্দিষ্ট।`
        ),
      },
    ],
  },

  // ─────────────────────── 8 · Uncertainty ───────────────────────
  {
    slug: 'uncertainty-principle',
    stage: 4, kind: 'physics', minutes: 10,
    title: tx('What the uncertainty principle actually says', 'অনিশ্চয়তা নীতি আসলে কী বলে'),
    standfirst: tx(
      'It is not about clumsy measurements. It is about what a wave can be.',
      'এটা মাপজোকের ভুল নিয়ে নয়। এটা নিয়ে যে একটা তরঙ্গ কেমন হতে পারে।'
    ),
    steps: [
      {
        title: tx('A wave with a place', 'জায়গা আছে এমন তরঙ্গ'),
        body: tx(
          r`A perfectly regular wave has one exact wavelength, so in quantum mechanics it has one exact momentum, $p = h/\lambda$. But it goes on forever: it has no position at all.

To make a wave that sits _somewhere_, you have to add many waves with slightly different wavelengths. They cancel everywhere except in one region: a **wave packet**.`,
          r`একটি নিখুঁত নিয়মিত তরঙ্গের তরঙ্গদৈর্ঘ্য একটাই, তাই কোয়ান্টাম মেকানিক্সে এর ভরবেগও একটাই, $p = h/\lambda$। কিন্তু এটা অনন্ত পর্যন্ত ছড়ানো: এর কোনো অবস্থানই নেই।

_কোথাও_ বসে থাকা একটা তরঙ্গ বানাতে হলে সামান্য ভিন্ন তরঙ্গদৈর্ঘ্যের অনেক তরঙ্গ যোগ করতে হয়। এক জায়গা ছাড়া বাকি সবখানে তারা একে অন্যকে মুছে দেয়: তৈরি হয় একটি **তরঙ্গ প্যাকেট**।`
        ),
        widget: 'packet',
      },
      {
        title: tx('The trade-off', 'দেওয়া-নেওয়া'),
        body: tx(
          r`The narrower the packet, the more different wavelengths it needs, so the wider its spread of momentum. Werner Heisenberg wrote this as

$$\Delta x \, \Delta p \ \ge\ \frac{\hbar}{2}$$

This is not about disturbing the particle when we look. It is a property of waves themselves: no wave can be both sharply placed and sharply pitched.`,
          r`প্যাকেট যত সরু, তত বেশি ভিন্ন তরঙ্গদৈর্ঘ্য লাগে, তাই ভরবেগের বিস্তারও তত বেশি। ভার্নার হাইজেনবার্গ এটা লিখেছিলেন এভাবে

$$\Delta x \, \Delta p \ \ge\ \frac{\hbar}{2}$$

দেখতে গিয়ে কণাকে নাড়িয়ে দেওয়ার ব্যাপার এটা নয়। এটা তরঙ্গেরই ধর্ম: কোনো তরঙ্গ একসাথে নিখুঁত জায়গায় আর নিখুঁত সুরে থাকতে পারে না।`
        ),
        quiz: {
          kind: 'choice',
          q: tx('You squeeze a wave packet to half its width. What happens to its spread of momentum?', 'একটি তরঙ্গ প্যাকেটকে চেপে অর্ধেক চওড়া করলেন। ভরবেগের বিস্তারের কী হয়?'),
          options: [
            { t: tx('It halves too', 'সেটাও অর্ধেক হয়') },
            { t: tx('It stays the same', 'একই থাকে') },
            { t: tx('It at least doubles', 'অন্তত দ্বিগুণ হয়'), correct: true },
          ],
          explain: tx(r`$\Delta x\,\Delta p$ can’t go below $\hbar/2$, so halving $\Delta x$ at least doubles $\Delta p$. Try it with the slider.`, r`$\Delta x\,\Delta p$ কখনো $\hbar/2$-এর নিচে নামতে পারে না, তাই $\Delta x$ অর্ধেক করলে $\Delta p$ অন্তত দ্বিগুণ হয়। স্লাইডারে চেষ্টা করে দেখুন।`),
        },
      },
      {
        title: tx('Atoms versus footballs', 'পরমাণু বনাম ফুটবল'),
        body: tx(
          r`An electron trapped inside an atom is confined to about $\Delta x = 10^{-10}$ m. Its speed must then be uncertain by at least

$$\Delta v \ge \frac{\hbar}{2\,m_e\,\Delta x} = \frac{1.055\times10^{-34}}{2 \times 9.11\times10^{-31} \times 10^{-10}}$$`,
          r`পরমাণুর ভেতরে আটকানো একটি ইলেকট্রন মোটামুটি $\Delta x = 10^{-10}$ মিটার জায়গায় সীমাবদ্ধ। তাহলে তার বেগের অনিশ্চয়তা অন্তত

$$\Delta v \ge \frac{\hbar}{2\,m_e\,\Delta x} = \frac{1.055\times10^{-34}}{2 \times 9.11\times10^{-31} \times 10^{-10}}$$`
        ),
        quiz: {
          kind: 'choice',
          q: tx('Roughly how big is that speed uncertainty?', 'বেগের এই অনিশ্চয়তা মোটামুটি কত বড়?'),
          options: [
            { t: tx('About 0.6 km/s', 'প্রায় ০.৬ কিমি/সে') },
            { t: tx('About 580 km/s', 'প্রায় ৫৮০ কিমি/সে'), correct: true },
            { t: tx('About 580,000 km/s, faster than light', 'প্রায় ৫,৮০,০০০ কিমি/সে, আলোর চেয়েও দ্রুত') },
          ],
          explain: tx(
            r`$\Delta v \approx 5.8\times10^{5}$ m/s $\approx 580$ km/s. Huge! For a 0.43 kg football pinned to within 1 mm, the same rule gives about $10^{-31}$ m/s: far too small ever to notice.`,
            r`$\Delta v \approx 5.8\times10^{5}$ মিটার/সে $\approx 580$ কিমি/সে। বিশাল! ১ মিমির মধ্যে আটকানো ০.৪৩ কেজির একটি ফুটবলের জন্য একই নিয়মে আসে প্রায় $10^{-31}$ মিটার/সে: এত ক্ষুদ্র যে কখনো টের পাওয়া যায় না।`
          ),
        },
      },
      {
        title: tx('The top of the trail', 'পথের চূড়া'),
        body: tx(
          r`You started with a circle and π, walked the circle to find sine and waves, learned to measure change with derivatives, turned with $i$, trapped waves on a string, watched them interfere, and arrived at the equation of the quantum world. Every step was the same idea in a new place: **waves, and what fits**.`,
          r`আপনি শুরু করেছিলেন একটি বৃত্ত আর π দিয়ে, বৃত্তে হেঁটে খুঁজে পেলেন সাইন আর তরঙ্গ, ডেরিভেটিভ দিয়ে পরিবর্তন মাপতে শিখলেন, $i$ দিয়ে ঘুরলেন, তারে তরঙ্গ আটকালেন, তাদের ব্যতিচার দেখলেন, আর পৌঁছালেন কোয়ান্টাম জগতের সমীকরণে। প্রতিটি ধাপ ছিল নতুন জায়গায় একই ধারণা: **তরঙ্গ, আর কোনটা আঁটে**।`
        ),
      },
    ],
  },
];

export const lessonBySlug = (slug: string) => lessons.find((l) => l.slug === slug);
