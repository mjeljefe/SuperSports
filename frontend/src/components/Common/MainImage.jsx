import React, { useState } from "react";
import ImgBackground from "../../assets/img/background01.png";

const MainImage = () => {
  const [checkUser, setCheckUser] = useState(false);
  return (
    <div>
      <section class="background">
        <img src={ImgBackground} alt="" />
      </section>
    </div>
  );
};

export default MainImage;
