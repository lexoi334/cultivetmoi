<template>
  <div class="footer">
    <div class="footerContent">
      <h3>Plan de site</h3>
      <a href="#">Home</a>
      <a href="#">Recherche</a>
      <a href="#">Profil</a>
    </div>
    <div class="footerContent">
      <h3>Mentions légales</h3>
      <a href="#">Mentions</a>
      <a href="#">Attributions</a>
    </div>
    <div class="footerContent">
      <h3>Partenaires</h3>
      <a href="#">part1</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

  .footer {
    justify-content: space-between;
    width: 100%;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    background-color: hsla(21, 41%, 15%, 0.800);
    padding: 0 20px;
  }

  h3 {
    font-size: 20px;
    color: #FFC152;
    margin: 10px 0;
  }

  .footerContent {
    display: flex;
    flex-direction: column;
      min-width: 150px;
  }

  .footerContent a {
      margin: 5px 0;
      color: #FFC152;
  }

</style>
