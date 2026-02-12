// 1. PROJE VERİLERİ
// Dosya yolları "images/..." klasör yapısına göre ayarlanmıştır.
const projects = [
    {
        title: "İç Mekan Tasarımları",
        category: "ic-mekan",
        images: [
            "images/projects/ic_mekan/1.jpeg",
            "images/projects/ic_mekan/2.jpeg",
            "images/projects/ic_mekan/3.jpeg",
            "images/projects/ic_mekan/4.webp",
            "images/projects/ic_mekan/5.webp",
            "images/projects/ic_mekan/6.webp",
            "images/projects/ic_mekan/7.webp",
            "images/projects/ic_mekan/8.webp",
            "images/projects/ic_mekan/9.webp"

        ]
    },
    {
        title: "Boya Uygulamaları",
        category: "boya",
        images: [
            "images/projects/boya/1.jpeg",
            "images/projects/boya/2.jpeg",
            "images/projects/boya/3.jpeg",
            "images/projects/boya/4.jpeg",
            "images/projects/boya/5.jpeg",
            "images/projects/boya/6.webp",
            "images/projects/boya/7.webp",
            "images/projects/boya/8.webp",
            "images/projects/boya/9.webp"
        ]
    },
    {
        title: "Fayans & Seramik",
        category: "fayans",
        images: [
            "images/projects/fayans/1.jpeg",
            "images/projects/fayans/2.jpeg",
            "images/projects/fayans/4.jpeg",
            "images/projects/fayans/5.jpeg",
            "images/projects/fayans/6.jpeg",
            "images/projects/fayans/7.webp"
        ]
    },
    {
        title: "Dış Cephe",
        category: "dis-cephe",
        images: [
            "images/projects/dis-cephe/1.jpeg",
            "images/projects/dis-cephe/2.jpeg",
            "images/projects/dis-cephe/3.jpeg",
            "images/projects/dis-cephe/4.jpeg",
            "images/projects/dis-cephe/5.jpeg",
            "images/projects/dis-cephe/6.jpeg"
        ]
    }
];

// 2. SAYFA GEÇİŞ FONKSİYONU (NAVIGATE)
function navigate(pageId) {
    console.log("Navigating to:", pageId);

    const homeView = document.getElementById('home-view');
    const projectsView = document.getElementById('projects-view');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobil menüyü kapat
    if (mobileMenu) mobileMenu.classList.add('hidden');

    // Önce tüm görünümleri gizle
    if (homeView) homeView.classList.add('hidden');
    if (projectsView) projectsView.classList.add('hidden');

    // İstenen sayfayı aç
    if (pageId === 'projeler') {
        if (projectsView) projectsView.classList.remove('hidden');
        renderProjects('all');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        if (homeView) homeView.classList.remove('hidden');

        if (pageId === 'anasayfa') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setTimeout(() => {
                const section = document.getElementById(pageId);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    }
}

// 3. PROJELERİ LİSTELEME FONKSİYONU
function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    filtered.forEach(proj => {
        proj.images.forEach(img => {
            const card = `
                <div class="project-card bg-darkbg_light rounded-xl overflow-hidden shadow-lg border border-gray-700 cursor-pointer transition duration-300">
                    <div class="h-64 overflow-hidden relative group">
                        <img src="${img}" 
                             alt="${proj.title}" 
                             class="w-full h-full object-cover transition duration-700 ease-in-out"
                             onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Resim+Yuklenemedi';">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                    </div>
                    <div class="p-4">
                        <div class="text-xs text-brand font-bold uppercase mb-1 tracking-widest">${proj.category.replace('-', ' ')}</div>
                        
                    </div>
                </div>
            `;
            grid.innerHTML += card;
        });
    });
}

// 4. KATEGORİ FİLTRELEME
function filterProjects(cat) {
    renderProjects(cat);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === cat) {
            btn.classList.add('active', 'bg-brand', 'text-darkbg');
            btn.classList.remove('bg-gray-800', 'text-white');
        } else {
            btn.classList.remove('active', 'bg-brand', 'text-darkbg');
            btn.classList.add('bg-gray-800', 'text-white');
        }
    });
}

// 5. MOBİL MENÜ AÇ/KAPA
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// ✅ 6. HERO SLIDER (3 görsel, 5 saniye, img ile fade)
function initHeroSlider() {
    const slides = document.querySelectorAll("#hero-slider .hero-slide");
    if (!slides || slides.length === 0) return;

    let current = 0;

    // İlk görsel açık
    slides.forEach((s, i) => (s.style.opacity = i === 0 ? "1" : "0"));

    setInterval(() => {
        slides[current].style.opacity = "0";
        current = (current + 1) % slides.length;
        slides[current].style.opacity = "1";
    }, 5000);
}

// Sayfa yüklendiğinde çalışacak kodlar (tek DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    console.log("Site başarıyla yüklendi.");
    initHeroSlider();
});
// KVKK MODAL AÇ
function openKvkk() {
    const modal = document.getElementById("kvkk-modal");
    if (!modal) return;

    modal.classList.remove("hidden");

    // küçük animasyon için
    setTimeout(() => {
        modal.classList.remove("opacity-0");
        modal.querySelector("div").classList.remove("scale-95");
    }, 10);
}

// KVKK MODAL KAPAT
function closeKvkk() {
    const modal = document.getElementById("kvkk-modal");
    if (!modal) return;

    modal.classList.add("opacity-0");
    modal.querySelector("div").classList.add("scale-95");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}
