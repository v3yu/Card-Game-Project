import {Card} from '/src/components/Card.js'

const myCard = new Card({name:'crash out',type:'attack',cost:1,
    description:'You\'ve been debugging for 6 hours straight',image:'/src/img/test.jpg'});

const bodyElement = document.querySelector('body')
myCard.render();


bodyElement.append(myCard);