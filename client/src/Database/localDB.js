module.exports = {
    "Offer" : [
        {content: "Registers", id: "Box1"},
        {content: "Rubber Stamp", id: "Box2"},
        {content: "Color Xerox", id: "Box3"},
        {content: "Letter Heads", id: "Box4"},
        {content: "Stationery", id: "Box5"},
        {content: "Spiral Binding", id: "Box6"},
        {content: "Digital Boards", id: "Box7"},
        {content: "Offset Printing", id: "Box8"},
        {content: "DTP", id: "Box9"}
    ],

    "Annoucement" : [
        {headContent: "The Shop is <span id='open'>open...</span>", mainContent: "<p > The Shop will remain opened during the following hours. <br/><br/> <strong> Sunday: </strong> Close for Complete Day. (Services may be available on demand) <br/> <strong> Regular Days</strong> : 09:00 AM to 21:00 PM </p> ", key: 1, id: "ShowAnnc"},
        {headContent: "Items not in <span id='Outstocks'>stocks: </span>", mainContent: "<p> The following items are currently not available <ul> <li>Namuna no. 23</li> <li>Namuna no. 26</li> <li>Pavti Pustak</li> <li>Namuna No. 8</li> <li>Tachapin</li> <li>Andaj Patrak</li> <li>Namuna no. 32</li> <li>Namuna no. 19</li> <li>Namuna no. 21</li> </ul> </p>", key: 2, id: "ShowAnnc" },
        {headContent: "New Item in <span id='Instocks'>stocks: </span>", mainContent: "<p >The following are the new items available <ul> <li>Namuna no. 8 Motha Shikha</li> <li>ABCXYZ</li> <li>Pavti Pustak</li> </ul> </p>", key: 3, id: "ShowAnnc" },
        {headContent: "No New <span id='Nostocks'>Annoucement </span>", mainContent: "<p >No new Annoucements are available as of today <ul>", key: 4, id: "HideAnnc" }
    ],

    "footerTopics" : [
        [
            {href: "https://www.facebook.com/profile.php?id=100071893074398", id: "Logo1"},
            {href: "https://www.instagram.com/_alwaysdeepak_/", id: "Logo2"},
            {href: "https://www.linkedin.com/in/deepak-sangle-684218212/", id: "Logo3"},
            {href: "https://twitter.com/DeepakS35306910", id: "Logo4"},
            {href: "https://wa.link/lfemtg", id: "Logo5"}
        ],
        [
            {name: "Register", href: "#",id: 1},
            {name: "Stamps", href: "#", id: 2},
            {name: "Banners", href: "#", id: 3},
            {name: "Letter Head", "href": "#", id: 4}
        ],
        [
            {name: "Create Account", href: "#", id: 1},
            {name: "Sign In", href: "#", id: 2},
            {name: "Manage Account", href: "#", id: 3},
            {name: "Sign Out", href: "#", id: 4}
        ],
        [
            {name: "Prices", href: "#", id: 1},
            {name: "Address", href: "#", id: 2},
            {name: "Contact Us", href: "#", id: 3}
        ]
    ],
    "navbarAnchors" : [
        {heading : "Home", subLinks : [], id : 1, href : "#"},
        {heading : "Services", subLinks : [
            {heading : "All Services", href : "#", id : 1},
            {heading : "All Registers", href : "#", id : 2},
            {heading : "Other Services", href : "#", id : 3}
        ], id : 2, href : "/services"},
        {heading : "Prices", subLinks : [
            {heading : "Price Lists", href : "#", id : 1},
            {heading : "Order", href : "#", id : 2}
        ], id : 3, href : "#"},
        {heading : "About", subLinks : [
            {heading : "Address", href : "#", id : 1},
            {heading : "Availability", href : "#", id : 2},
            {heading : "Contact", href : "#", id : 3}
        ], id : 4, href : "#"},
        {heading : "Account", subLinks : [
            {heading : "Cart", href : "#", id : 1},
            {heading : "Annoucement", href : "#", id : 2},
            {heading : "Sign out", href : "/signout", id : 3}
        ], id : 5, href : "#"}
    ]

}