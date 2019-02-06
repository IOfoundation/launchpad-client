import React from 'react';
import Detail from './Detail';

const MainSection = () => {
  return (
    <section className="business-details-section contentContainer">
      <div className="business-details-section__information">
        <h2 className="business-details-section__information__title text-semi">
          Golden Sierra Job Training Agency
        </h2>
        <p className="business-details-section__information__content">
          Lhtmlorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          mattis magna felis, in porta elit tincidunt eu. Ut a euismod nibh.
          Maecenas ultrices iaculis orci vitae eleifend. Aliquam eu nibh lacus.
          Curabitur rhoncus gravida sapien, a mollis mauris bibendum sit amet.
          Maecenas iaculis purus ante, faucibus egestas ligula consectetur vel.
          Vestibulum dignissim facilisis mauris mollis lobortis. Donec volutpat
          ligula in velit luctus, ut porttitor massa varius. Cras dictum
          interdum orci, ut vulputate sapien convallis at. Vestibulum pulvinar
          libero ac blandit accumsan. Proin ullamcorper ipsum non viverra
          interdum. Suspendisse ac nulla quis justo ultricies posuere ac non
          sapien. Aliquam malesuada dui sed neque tempor sollicitudin. Nam
          dictum sed dui vitae pellentesque. Cras molestie metus justo. Proin
          quis elit at lacus consectetur pretium
        </p>
        <div className="business-details-section__information__data">
          <Detail title="Date of Incorporation" content="March 1, 2013" />
          <Detail
            title="Accreditations"
            content="Parturient Fusce Ultricies Risus Vulputate"
          />
          <Detail title="Licenses" content="Purus Tellus Cras Ipsum" />
          <Detail title="Legal Status" content="Non-Profit" />
        </div>
      </div>
      <div className="business-details-section__logo">
        <div className="business-details-section__logo__container">
          <img
            className="business-details-section__logo__img"
            src="http://gdurl.com/ptEF"
          />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
