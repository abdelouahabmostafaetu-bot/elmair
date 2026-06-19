// ============================================================
//  All website text content (Arabic + English) in one place.
//  Edit text here to change it everywhere on the site.
// ============================================================

export const SITE = {
  name: {
    ar: "مركز المعيار للبحوث والدراسات",
    en: "Al-Meiyar Center for Research & Studies",
  },
  short: { ar: "مركز المعيار", en: "Al-Meiyar Center" },
  email: "contact.almeiyar@gmail.com",
};

export const UI = {
  // Navigation
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_about: { ar: "من نحن", en: "About" },
  nav_services: { ar: "الخدمات", en: "Services" },
  nav_portfolio: { ar: "أعمالنا", en: "Portfolio" },
  nav_blog: { ar: "المدونة", en: "Blog" },
  nav_contact: { ar: "اتصل بنا", en: "Contact" },
  nav_admin: { ar: "الإدارة", en: "Admin" },
  sign_in: { ar: "تسجيل الدخول", en: "Sign in" },
  sign_up: { ar: "إنشاء حساب", en: "Sign up" },
  // Hero
  hero_kicker: { ar: "التميز الأكاديمي والمؤسسي", en: "Academic & Corporate Excellence" },
  hero_title: {
    ar: "نحوّل المعرفة إلى أثرٍ عالمي",
    en: "Turning knowledge into global impact",
  },
  hero_sub: {
    ar: "مركز متخصص في البحث العلمي، النشر الدولي، براءات الاختراع، والاستشارات المؤسسية — بمعايير عالمية ولمسة احترافية.",
    en: "A center for scientific research, international publishing, patents, and corporate consulting — built to world-class standards.",
  },
  hero_cta1: { ar: "اكتشف خدماتنا", en: "Explore services" },
  hero_cta2: { ar: "تواصل معنا", en: "Get in touch" },
  // Sections
  sectors_title: { ar: "بوابتان، خبرة واحدة", en: "Two gateways, one expertise" },
  sectors_sub: {
    ar: "نخدم الباحثين والجامعات من جهة، والشركات والمؤسسات من جهة أخرى.",
    en: "We serve researchers and universities, as well as companies and institutions.",
  },
  read_more: { ar: "اقرأ المزيد", en: "Read more" },
  view_all_services: { ar: "كل الخدمات", en: "All services" },
  latest_blog: { ar: "أحدث المقالات", en: "Latest articles" },
  view_all_blog: { ar: "كل المقالات", en: "View all" },
  portfolio_preview: { ar: "من أعمالنا", en: "Selected work" },
  cta_band_title: { ar: "جاهز لرفع مستوى مشروعك؟", en: "Ready to elevate your project?" },
  cta_band_sub: {
    ar: "أرسل طلبك وسيقوم فريقنا بفرزه والرد عليك بدقة.",
    en: "Send your request and our team will route and answer it precisely.",
  },
  // Footer
  footer_about: {
    ar: "مركز المعيار للبحوث والدراسات — شريكك في البحث العلمي والتطوير المؤسسي.",
    en: "Al-Meiyar Center — your partner in scientific research and institutional development.",
  },
  footer_links: { ar: "روابط سريعة", en: "Quick links" },
  footer_contact: { ar: "تواصل", en: "Contact" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  // Generic
  loading: { ar: "جارٍ التحميل...", en: "Loading..." },
  empty_blog: { ar: "لا توجد مقالات بعد.", en: "No articles yet." },
  empty_portfolio: { ar: "سيتم إضافة الأعمال قريبًا.", en: "Work will be added soon." },
  back: { ar: "رجوع", en: "Back" },
};

export const STATS = [
  { value: "+50", label: { ar: "مشروع علمي", en: "Research projects" } },
  { value: "Scopus", label: { ar: "فهرسة دولية", en: "International indexing" } },
  { value: "ISO 9001", label: { ar: "معايير الجودة", en: "Quality standards" } },
  { value: "24/7", label: { ar: "دعم ومرافقة", en: "Support & guidance" } },
];

// Two sectors with detailed services (from the official spec document).
export const SECTORS = [
  {
    id: "academic",
    theme: "academic",
    title: { ar: "القطاع الأكاديمي والبحث العلمي", en: "Academic & Scientific Research" },
    intro: {
      ar: "التعليم العالي، النشر الدولي، براءات الاختراع، والاستشارات الأكاديمية.",
      en: "Higher education, international publishing, patents, and academic consulting.",
    },
    services: [
      {
        icon: "BookOpen",
        title: { ar: "توثيق الملتقيات في Scopus و Clarivate", en: "Conference indexing in Scopus & Clarivate" },
        desc: {
          ar: "هندسة المسار الكامل لإدراج أعمال المؤتمرات الدولية في قواعد البيانات العالمية.",
          en: "Engineering the full path to index international conference proceedings in global databases.",
        },
        points: [
          { ar: "بناء مواقع المؤتمرات الرسمية", en: "Official conference landing pages" },
          { ar: "تهيئة منصات الاستقبال (EasyChair / EquinOCS)", en: "Submission platforms (EasyChair / EquinOCS)" },
          { ar: "فحص الاستلال عبر Turnitin", en: "Plagiarism checks via Turnitin" },
          { ar: "الوساطة مع دور النشر (Springer, IEEE, Elsevier)", en: "Liaison with publishers (Springer, IEEE, Elsevier)" },
        ],
      },
      {
        icon: "Library",
        title: { ar: "تأهيل المجلات العلمية للأرشفة الدولية", en: "Qualifying journals for international indexing" },
        desc: {
          ar: "نقل المجلات المحلية من النشر التقليدي إلى مصاف المجلات المصنفة عالمياً.",
          en: "Moving local journals from traditional publishing to world-class indexed status.",
        },
        points: [
          { ar: "تنصيب وضبط نظام OJS", en: "OJS setup & configuration" },
          { ar: "سياسات النشر وأخلاقيات COPE", en: "Publishing policies & COPE ethics" },
          { ar: "تنويع هيئات التحرير والمحكمين", en: "Diversifying editorial boards & reviewers" },
          { ar: "التقديم أمام لجنة Scopus (CSAB)", en: "Submission to Scopus CSAB" },
        ],
      },
      {
        icon: "Lightbulb",
        title: { ar: "براءات الاختراع وحماية الملكية الفكرية", en: "Patents & intellectual property (INAPI & WIPO)" },
        desc: {
          ar: "تحويل الابتكارات إلى أصول قانونية محمية ومقبولة رسمياً.",
          en: "Turning innovations into protected, officially-accepted legal assets.",
        },
        points: [
          { ar: "فحص الحالة السابقة (Prior Art Search)", en: "Prior Art Search" },
          { ar: "صياغة المطالب القانونية (Claims)", en: "Legal claims drafting" },
          { ar: "الرسوم الهندسية وفق INAPI", en: "Technical drawings per INAPI" },
          { ar: "مرافقة مشاريع القرار 1275", en: "Decree 1275 project support" },
        ],
      },
      {
        icon: "GraduationCap",
        title: { ar: "مرافقة القبولات والمنح الدولية", en: "University admissions & international scholarships" },
        desc: {
          ar: "هندسة ملفات الترشح للجامعات والمنح العالمية الكبرى.",
          en: "Engineering application files for top universities and scholarships.",
        },
        points: [
          { ar: "صياغة خطاب الغرض (SOP) ودوافع", en: "Statement of Purpose & motivation letters" },
          { ar: "سيرة ذاتية أكاديمية (ATS / EuroPass)", en: "Academic CV (ATS / EuroPass)" },
          { ar: "رسائل التوصية", en: "Recommendation letters" },
          { ar: "التحضير للمقابلات الشفهية", en: "Interview preparation" },
        ],
      },
      {
        icon: "Microscope",
        title: { ar: "الاستشارات الأكاديمية ومرافقة الدراسات العليا", en: "Graduate research consulting" },
        desc: {
          ar: "مرافقة طلاب الدراسات العليا في مناهج البحث والتحليل الإحصائي بأمانة علمية.",
          en: "Guiding graduate students in methodology and statistics with full academic integrity.",
        },
        points: [
          { ar: "تحليل البيانات (SPSS, MATLAB)", en: "Data analysis (SPSS, MATLAB)" },
          { ar: "صياغة الإشكاليات والأطر النظرية", en: "Research problems & theoretical frameworks" },
          { ar: "خطط البحث الاستراتيجية", en: "Strategic research plans" },
        ],
      },
      {
        icon: "PenTool",
        title: { ar: "التدقيق اللغوي والأكاديمي الفاخر", en: "Premium academic proofreading" },
        desc: {
          ar: "مراجعة لغوية معمقة للمقالات والأطروحات (عربي/إنجليزي/فرنسي) للنشر الدولي.",
          en: "In-depth language review (Arabic/English/French) for international publishing.",
        },
        points: [],
      },
    ],
  },
  {
    id: "corporate",
    theme: "corporate",
    title: { ar: "قطاع الشركات والتطوير المؤسسي", en: "Corporate & Institutional Development" },
    intro: {
      ar: "التدريب، استشارات الجودة، والتطوير الإداري للمؤسسات.",
      en: "Training, quality consulting, and management development for institutions.",
    },
    services: [
      {
        icon: "Presentation",
        title: { ar: "التدريب والتطوير المؤسسي", en: "Corporate training & development" },
        desc: {
          ar: "سد الفجوة بين الطرح الأكاديمي والممارسة الميدانية لرفع كفاءة الموظفين.",
          en: "Bridging academic theory and field practice to upskill teams.",
        },
        points: [
          { ar: "تصميم حقائب تدريبية حصرية", en: "Custom training kits" },
          { ar: "تدريب القيادة والمهارات الناعمة", en: "Leadership & soft-skills training" },
          { ar: "برامج لغات ومهارات مكثفة", en: "Intensive language & skills programs" },
        ],
      },
      {
        icon: "BadgeCheck",
        title: { ar: "استشارات الجودة والتميز التشغيلي", en: "Quality & operational excellence" },
        desc: {
          ar: "هيكلة الأنظمة الإدارية لضمان الكفاءة والتميز التشغيلي الدائم.",
          en: "Structuring management systems for lasting operational excellence.",
        },
        points: [
          { ar: "تأهيل ISO 9001:2015", en: "ISO 9001:2015 readiness" },
          { ar: "الهيكلة التنظيمية وتوصيف الوظائف", en: "Org charts & job descriptions" },
          { ar: "لوحات مؤشرات الأداء (KPIs)", en: "KPI dashboards" },
        ],
      },
      {
        icon: "MessageSquareText",
        title: { ar: "الاستشارات اللغوية وسيميائية المحتوى", en: "Content, language & semiotics consulting" },
        desc: {
          ar: "توظيف العمق اللغوي لخدمة المحتوى الرسمي والتجاري والترويجي.",
          en: "Leveraging linguistic depth for official, commercial and marketing content.",
        },
        points: [
          { ar: "تدقيق الكتب والتقارير الرسمية", en: "Proofreading books & official reports" },
          { ar: "تحليل الخطاب الإعلاني والسيميائية", en: "Advertising & semiotic analysis" },
          { ar: "صناعة محتوى تخصصي فاخر", en: "Premium specialized content" },
        ],
      },
    ],
  },
];

// Portfolio filter categories.
export const PORTFOLIO_CATEGORIES = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "patents", label: { ar: "براءات الاختراع", en: "Patents" } },
  { id: "scopus", label: { ar: "ملتقيات ومجلات Scopus", en: "Scopus journals & events" } },
  { id: "training", label: { ar: "حقائب تدريبية واستشارات", en: "Training & consulting" } },
  { id: "scholarships", label: { ar: "قبولات ومنح دولية", en: "Admissions & scholarships" } },
];

// Contact form conditional options.
export const CONTACT = {
  identities: [
    { id: "researcher", label: { ar: "باحث / طالب دراسات عليا", en: "Researcher / Graduate student" } },
    { id: "university", label: { ar: "ممثل عن مخبر أو جامعة", en: "Lab / University representative" } },
    { id: "company", label: { ar: "ممثل عن شركة أو مستثمر", en: "Company / Investor representative" } },
  ],
  academicServices: [
    { ar: "توثيق ملتقى", en: "Conference indexing" },
    { ar: "تأهيل مجلة", en: "Journal qualification" },
    { ar: "صياغة براءة اختراع", en: "Patent drafting" },
    { ar: "تدقيق لغوي", en: "Proofreading" },
    { ar: "مرافقة منحة أو قبول دولي", en: "Scholarship / admission support" },
  ],
  corporateServices: [
    { ar: "تدريب كوادر", en: "Staff training" },
    { ar: "استشارات جودة وهيكلة", en: "Quality & structuring consulting" },
    { ar: "تحليل خطاب وسيميائية إعلانية", en: "Discourse & advertising analysis" },
  ],
};
