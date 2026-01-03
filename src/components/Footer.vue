<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">ViveChina</h3>
          <p class="footer-description">
            {{ $t('footer.description') }}
          </p>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">{{ $t('footer.contactUs') }}</h4>
          <ul class="footer-contact">
            <li>📧 info@vivechina.nl</li>
            <li>📞 +86 400-123-4567</li>
            <li>📍 {{ $t('footer.contactUs') === 'Contáctanos' ? 'Beijing, China' : '中国北京市' }}</li>
          </ul>
        </div>
        <div class="footer-section" id="siguenos">
          <h4 class="footer-heading">{{ $t('footer.followUs') }}</h4>
          <div class="social-links" role="list">
            <a
              href="https://www.facebook.com/vivechinafestivalcultural?mibextid=wwXIfr&rdid=ZAud4RNBoY58LYfZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JS4mpqshU%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="$t('footer.visitFacebook')"
            >
              <span aria-hidden="true">📘</span> Facebook
            </a>
            <a
              href="https://www.instagram.com/vivechina_festival/?igsh=dDA5ODl5bG00a3pr#"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="$t('footer.visitInstagram')"
            >
              <span aria-hidden="true">📷</span> Instagram
            </a>
            <a
              href="https://www.tiktok.com/@vivechina?_r=1&_t=ZS-92GyEE1YA4X"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="$t('footer.visitTikTok')"
            >
              <span aria-hidden="true">🎵</span> TikTok
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} ViveChina. {{ $t('footer.allRightsReserved') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: var(--bg-dark);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.footer-heading {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-links,
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.footer-links a:focus {
  color: white;
}

.footer-contact li {
  color: rgba(255, 255, 255, 0.8);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.social-link:hover,
.social-link:focus {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>

