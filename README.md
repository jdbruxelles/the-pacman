# Pacman

## Projet 3 WEBG2 2021

### Bonus

- [ ] La possibilité de redémarrer le jeu.
- [ ] Une IA propre à chacun des fantômes pour un comportement personnalisé.
- [x] La bouche du Pacman, et une apparence réaliste des fantômes.
- [x] Le "trou de ver" qui permet de passer du côté gauche au côté droit et inversement.
- [x] Les super-gommes permettent au Pacman de manger les fantômes pour gagner des points.
- [ ] L'apparition des fruits.



{% if site.analytics.google.tracking_id %}
    <script>
      if (!(navigator.doNotTrack && navigator.doNotTrack == "1" ||
            window.doNotTrack && window.doNotTrack == "1")) {
        (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
        ga("create", "{{ site.analytics.google.tracking_id }}", "auto");
        ga("send", "pageview");
      }
    </script>
  {% endif %}