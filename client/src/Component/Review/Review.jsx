import React from 'react';
import {Card} from 'react-bootstrap';
import {AiFillStar} from "react-icons/ai"
import style from './Review.module.css';

export default function Review({Review}){
    let subtitle='';
    switch(Review.calificacion){
        case 1:
            subtitle='Malo';
            break;
        case 2:
            subtitle='Regular';
            break;
        case 3:
            subtitle='Normal';
            break;
        case 4:
            subtitle='Muy bueno';
            break;
        case 5:
            subtitle='Excelente';
            break;

        default:
            subtitle='Malo';
            break;

    }

    let fillStar=<AiFillStar className={style.Star}/>;
    let emptyStar=<AiFillStar className={style.emptyStar} />;
    let stars=[emptyStar,emptyStar,emptyStar,emptyStar,emptyStar];
    for(let i=0;i<Review.calificacion;i++){
        stars[i]=fillStar;
    }
    
    
    return (

        <Card className={style.Card}>
            <Card.Title className={style.cTitle}>{stars}</Card.Title>
            <Card.Subtitle className={style.cSubtitle}>{subtitle}</Card.Subtitle>
            <Card.Body>{Review.descripcion}</Card.Body>
        </Card>

    )

}