<template>
  <section id="entradas" class="entradas section" aria-labelledby="entradas-title">
    <div class="container">
      <h2 id="entradas-title" class="section-title">{{ $t('entradas.title') }}</h2>
      <div class="tickets-content">
        <div class="tickets-info">
          <p class="info-text">
            {{ $t('entradas.infoText') }}
          </p>
          <div class="ticket-types">
            <article
              v-for="ticket in tickets"
              :key="ticket.id"
              class="ticket-card"
              role="article"
              :aria-labelledby="`ticket-${ticket.id}-title`"
            >
              <h3 :id="`ticket-${ticket.id}-title`" class="ticket-title">
                {{ ticket.title }}
              </h3>
              <p v-if="ticket.subtitle" class="ticket-subtitle">{{ ticket.subtitle }}</p>
              <div class="ticket-price">
                <span v-if="ticket.price === '0.00'" class="price-free">{{ $t('entradas.free') }}</span>
                <template v-else>
                  <span class="price-currency">{{ ticket.currency }}</span>
                  <span class="price-amount">{{ ticket.price }}</span>
                </template>
                <span v-if="ticket.price !== '0.00'" class="price-unit">{{ $t('entradas.perPerson') }}</span>
              </div>
              <button
                class="btn-ticket"
                :class="{ 'btn-free': ticket.price === '0.00' }"
                @click="handlePurchase"
                :aria-label="ticket.price === '0.00' ? `${ticket.freeButtonText1} ${ticket.freeButtonText2}` : $t('entradas.buyTicketLabel', { title: ticket.title })"
              >
                <span v-if="ticket.price === '0.00'" class="btn-text">
                  {{ ticket.freeButtonText1 }}<br>{{ ticket.freeButtonText2 }}
                </span>
                <template v-else>
                  <span class="btn-text">{{ $t('entradas.buyTicket') }}</span>
                  <span class="btn-icon">→</span>
                </template>
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const tickets = computed(() => {
  const ticketData = tm('entradas.tickets') as Array<{
    title: string
    subtitle?: string
    price: string
    currency: string
    features: string[]
    freeButtonText1?: string
    freeButtonText2?: string
  }>
  
  return ticketData.map((ticket, index) => ({
    id: index + 1,
    title: ticket.title,
    subtitle: ticket.subtitle,
    price: ticket.price,
    currency: ticket.currency,
    features: ticket.features,
    freeButtonText1: ticket.freeButtonText1,
    freeButtonText2: ticket.freeButtonText2
  }))
})

const TICKET_URL = 'https://www.joinnus.com/events/entertainment/arequipa-vive-china-73034'

const handlePurchase = () => {
  window.open(TICKET_URL, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.entradas {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-top: 2rem;
}

.entradas .section-title {
  color: white;
}

.entradas .section-title::after {
  background: white;
}

.tickets-content {
  max-width: 1000px;
  margin: 0 auto;
}

.tickets-info {
  text-align: center;
}

.info-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.ticket-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.ticket-card {
  background: white;
  color: var(--text-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-hover);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.ticket-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.ticket-subtitle {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 1rem;
  font-weight: 400;
}

.ticket-price {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-currency {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.price-free {
  font-size: 2rem;
  font-weight: 700;
  color: var(--secondary-color);
  text-transform: uppercase;
}

.price-unit {
  font-size: 1rem;
  color: var(--text-light);
  margin-left: 0.5rem;
}


.btn-ticket {
  width: 100%;
  margin-top: auto;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color) 0%, #b71c1c 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3);
}

.btn-ticket.btn-free {
  flex-direction: column;
  line-height: 1.4;
}

.btn-ticket::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-ticket:hover::before {
  left: 100%;
}

.btn-ticket:hover,
.btn-ticket:focus {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 47, 47, 0.4);
  background: linear-gradient(135deg, #b71c1c 0%, #8b0000 100%);
}

.btn-ticket:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(211, 47, 47, 0.3);
}

.btn-ticket .btn-text {
  position: relative;
  z-index: 1;
}

.btn-ticket .btn-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.btn-ticket:hover .btn-icon {
  transform: translateX(4px);
}

.btn-ticket.btn-free {
  background: linear-gradient(135deg, var(--secondary-color) 0%, #e65100 100%);
  box-shadow: 0 4px 15px rgba(245, 124, 0, 0.3);
}

.btn-ticket.btn-free:hover,
.btn-ticket.btn-free:focus {
  box-shadow: 0 6px 20px rgba(245, 124, 0, 0.4);
  background: linear-gradient(135deg, #e65100 0%, #bf360c 100%);
}

.btn-ticket.btn-free:active {
  box-shadow: 0 2px 10px rgba(245, 124, 0, 0.3);
}

@media (max-width: 768px) {
  .ticket-types {
    grid-template-columns: 1fr;
  }
}
</style>

