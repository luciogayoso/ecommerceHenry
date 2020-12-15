import React from "react";
import style from './footer.css'


export default function Footer(){
  return (
    <div class="d-flex flex-column" className={style.footer}>
  <footer class="footer">
    <div className="row">
        <p className="col-m center"><a href="/">Home</a> |<a href="/about">Devs</a> | <a href="/">Logout</a></p>
    </div>
    <div className="row">
        <p className="col-sm">
            &copy;{new Date().getFullYear()} TECH SHOP | All rigth reserved
        </p>
    </div>
  </footer>
</div>
  );
}
