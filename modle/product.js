const products=
{
    fakePD:[],

    initProduct()
    {

        this.fakePD.push({
            title:`Mchoice 50 PCS Disposable Earloop Face Mask Filters Bacteria Breathable Beauty Medical 3 PLY`,
            price:`CDN$ 19.67`,
            productImg: `img/product1.jpg`,
            categoryName:`Mask`,
            bestSeller:true
        });

        this.fakePD.push({
            title: `Carhartt Men's Acrylic Watch Hat`,
            price: `CDN$ 13.99 - CDN$ 94.78`,
            productImg: `img/product2.jpg`,
            categoryName:`Hat and socks`,
            bestSeller:false
        });

        this.fakePD.push({
            title: `Hanes Mens EcoSmart Fleece Sweatshirt Sweatshirt`,
            price: `CDN$ 12.50 - CDN$ 199.00`,
            productImg: `img/product3.jpg`,
            categoryName:`Clothes`,
            bestSeller:false
        });

        this.fakePD.push({
            title: `ALONG FIT Yoga Pants for Women mesh Leggings with Side Pockets Mid Waisted Leggings`,
            price: `CDN$ 25.95 - CDN$ 32.99`,
            productImg: `img/product4.jpg`,
            categoryName:`Clothes`,
            bestSeller:true
        });

        this.fakePD.push({
            title: `TIJN Blue Light Blocking Glasses Square Nerd Eyeglasses Frame Computer Game Glasses`,
            price: `CDN$ 19.99 - CDN$ 58.31`,
            productImg: `img/product5.jpg`,
            categoryName:`Glasses`,
            bestSeller:false
        });

        this.fakePD.push({
            title: `Ambielly Winter Women Socks 5 Pairs Vintage Style Knit Wool Casual Socks Warm Socks`,
            price: `CDN$ 4.40 - CDN$ 15.87`,
            productImg: `img/product6.jpg`,
            categoryName:`Hat and socks`,
            bestSeller:true
        });

        this.fakePD.push({
            title: `Queenfur Knit Slouchy Beanie for Women Thick Baggy Hat Faux Fur Pompom Winter Hat`,
            price: `CDN$ 13.99 - CDN$ 69.18`,
            productImg: `img/product7.jpg`,
            categoryName:`Hat and socks`,
            bestSeller:true
        });       

    },

    getAllProducts()
    {

        return this.fakePD;
    },

    getAllSellers()
    {
        const bestPruducts=[];
        this.fakePD.forEach(a=>{
            if(a.bestSeller==true){
                bestPruducts.push(a);
            }
        });
        return bestPruducts;
    }

}

products.initProduct();

const categorySection={
    fakeCG:[],

    initCategory()
    {

        this.fakeCG.push({
            category: `Masks`,
            categoryImg: `img/mask.jpg`,

        });

        this.fakeCG.push({
            category: `Hat & Socks`,
            categoryImg: `img/hatSock.jpg`
        });

        this.fakeCG.push({
            category: 'Clothes',
            categoryImg: 'img/clothes.jpg'
        });

        this.fakeCG.push({
            category: 'Glasses',
            categoryImg: 'img/glasses.jpg'
        });

        this.fakeCG.push({
            category: 'Baby nursery',
            categoryImg: 'img/BabyNursery.jpg'
        });
        

    },

    getAllCategories()
    {

        return this.fakeCG;
    }
}
categorySection.initCategory();


module.exports.products = products;
module.exports.categorySection = categorySection;