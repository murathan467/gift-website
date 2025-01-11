const VIDEO_WIDTH = 200;

const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');
const $VIDEOContainer = document.querySelector('.video-container');
const $VIDEOs = document.querySelectorAll('video');
let currentVideo = 1;
let timeout;

function updateVideo() {
  if (currentVideo > $VIDEOs.length) {
    currentVideo = 1;
  } else if (currentVideo < 1) {
    currentVideo = $VIDEOs.length;
  }

  // Tüm videoların sesini kapat
  $VIDEOs.forEach((video, index) => {
    if (index === currentVideo - 1) {
      video.muted = false; // Aktif videonun sesini aç
    } else {
      video.muted = true;  // Diğer videoların sesini kapat
    }
  });

  // Videoları kaydır
  $VIDEOContainer.style.transform = `translateX(-${(currentVideo - 1) * VIDEO_WIDTH}px)`;

  // Otomatik geçiş zamanlayıcısını sıfırla
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    currentVideo++;
    updateVideo();
  }, 5000); // 5 saniye
}

// Sol ve sağ butonlara tıklama olayları
$prev.addEventListener('click', () => {
  clearTimeout(timeout);
  currentVideo--;
  updateVideo();
});

$next.addEventListener('click', () => {
  clearTimeout(timeout);
  currentVideo++;
  updateVideo();
});

// İlk güncellemeyi başlat
updateVideo();
