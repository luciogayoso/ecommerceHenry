import React from 'react';
import Review from './Review'
import { Card, Container } from 'react-bootstrap';
import {AiFillStar} from "react-icons/ai"
import style from './Review.module.css';

export default function ReviewContainer({ Reviews }) {

    if(Reviews !== undefined){
    if (Reviews.length !== 0) {
        let reviewsRateSum = 0;
        for (let i = 0; i < Reviews.length; i++) {
            reviewsRateSum += Reviews[i].calificacion;
        }
        let reviewsRateProm = (Math.ceil(reviewsRateSum / Reviews.length)) + '.0';

        let fillStar = <AiFillStar className={style.Star} />;
        let emptyStar = <AiFillStar className={style.emptyStar} />;
        let stars = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
        for (let i = 0; i < reviewsRateProm; i++) {
            stars[i] = fillStar;
        }
    

        return (
            
                <Card className={style.cardRContainer}>
                    <Card.Title>Opiniones sobre el producto</Card.Title>
                    <p className={style.pProm}>
                        <Card.Subtitle className={style.rProm}>{reviewsRateProm}</Card.Subtitle>
                        <div className={style.pStar}>
                            <div className={style.rStars}> {stars}</div>
                            <div className={style.cText}>Promedio entre {Reviews.length} opiniones</div>
                        </div>
                    </p>


                    {
                        Reviews.map(r => {
                            return <Review Review={r}></Review>

                        })
                    }
                </Card>
            
        )
    } else {
        return (<Container className={style.cardRContainer}>No hay Reviews de este producto</Container>)
    }
}else {
    return (<Container className={style.cardRContainer}>No hay Reviews de este producto</Container>)
}

}