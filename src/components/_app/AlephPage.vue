<template>
  <main class="page">
    <nav class="sidebar-toc">
      <slot name="toc" />
    </nav>
    <div class="main">
      <slot />
    </div>
    <nav class="sidebar-outline">
      <slot name="outline" />
    </nav>
    <div class="sidebar-details">
      <slot name="details" />
    </div>
  </main>
</template>

<style scoped>
.page {
  --header-height: 88px;

  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
  gap: 0;
}

@media (width >= 768px) {
  .page {
    flex-direction: row;
  }
}

.sidebar-toc {
  flex: 1;
  padding: 15px 20px 20px;
  border-right: 1px solid var(--color-border-primary);
}

@media (width >= 768px) {
  .sidebar-toc {
    min-width: 320px;
  }
}

.main {
  flex: 3;
  padding: 30px;
}

.sidebar-outline:has(*) {
  flex: 2;
  padding: 30px 20px 10px;
  transition: all 0.2s ease-in-out;
  opacity: 0.5;
}

.sidebar-outline:has(*):hover {
  opacity: 1;
}

.sidebar-details:has(*) {
  flex: 2;
  padding: 30px 20px 10px;
  border-right: 1px solid var(--color-border-primary);
}
</style>
