
/* ======= Model ======= */
//jshint esversion:6
class STATE {
    constructor(){
        this.currentCat=null;
        this.cats=[];
       this.init();
    }
    init(){
    this.cats= [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ];
    this.currentCat=this.cats[0];
}
}

/* ======= Controller ======= */

class Controller{
constructor(state,catListView,catView){
    this.state=state;
    this.catListView=catListView;
    this.catView=catView;
   
}
    initialRender(){
        // set our current cat to the first one in the list
        // tell our views to initialize
        this.catListView.render(this);
        this.catView.setClickHandler(this);
        this.catView.render(this);
      
    }

    getCurrentCat() {
        return this.state.currentCat;
    }

    getCats(){
        return this.state.cats;
    }

    // set the currently-selected cat to the object passed in
    setCurrentCat(cat) {
        this.state.currentCat = cat;
        this.renderCatView();
    }
   renderCatView(){
    this.catView.render(this);
   }
    // increments the counter for the currently-selected cat
    incrementCounter() {
        this.state.currentCat.clickCount++;
      this.renderCatView();
    }
}


/* ======= View ======= */

class catView{
constructor(){
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');
    // store pointers to our DOM elements for easy access later
      

        // on click, increment the current cat's counter
     
}

setClickHandler(controller){
    this.catImageElem.addEventListener('click',()=>controller.incrementCounter());

}
       render(controller){
        // update the DOM elements with values from the current cat
        const currentCat = controller.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
}

class catListView{

    constructor() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');
    }

    render(controller) {
        let cat, elem, i;
        // get the cats we'll be rendering from the octopus
        let cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        cats.forEach(cat => {
            let elem = document.createElement('ul');
            elem.innerHTML=`<i class="fas fa-paw fa-2x">${cat.name}</i>`
            //elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click',()=>controller.setCurrentCat(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        });
       
    }
}

// make it go!
const controller=new Controller(new STATE(),new catListView(),new catView());
controller.initialRender();
