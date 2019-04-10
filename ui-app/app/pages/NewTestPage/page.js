
    //===== PAGE-ACTIONS-START-loadASpot
    actions.loadASpot = loadASpot;
    function loadASpot(){
        ThisPage.loadSpot("funspot", "We are having fun now")
    };
    //===== PAGE-ACTIONS-END-loadASpot

    //===== PAGE-ACTIONS-START
    actions.loadASpot = loadASpot;
    function loadASpot(){
        var tmpHTML = [];
        tmpHTML.push('<div class="ui-layout-center">Center')
        tmpHTML.push('</div>')
        tmpHTML.push('<div class="ui-layout-north">North</div>')
        tmpHTML.push('<div class="ui-layout-south">South</div>')
        tmpHTML.push('<div class="ui-layout-east">East</div>')
        tmpHTML.push('<div class="ui-layout-west">West</div>')
        tmpHTML = tmpHTML.join('');

        ThisPage.loadSpot("body",tmpHTML);
        var tmpBodySpot =  ThisPage.getSpot("body");
        var tmpLayout = tmpBodySpot.layout();
        console.log( 'tmpLayout', tmpLayout);
        if (typeof (ThisApp.refreshLayouts) == 'function') {
            ThisApp.refreshLayouts();
        }
        console.log( 'tmpBodySpot', tmpBodySpot);

        
    };
    //===== PAGE-ACTIONS-END

    
    //===== NO EDIT ABOVE THIS LINE ====== ====== ====== ====== ====== ====== ====== ====== 
    //===== CUSTOM-PAGE-CODE-START
    
