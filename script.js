 window.myCPP = window.myCPP || {};

    //replace with the CCP URL for the current Amazon Connect instance
    var ccpUrl = "https://MYINSTANCE.awsapps.com/connect/ccp#/";

    connect.core.initCCP(containerDiv, {
        ccpUrl: ccpUrl,        
        loginPopup: true,         
        softphone: {
            allowFramedSoftphone: true
        }
    });

    connect.contact(subscribeToContactEvents);  
    

    function subscribeToContactEvents(contact) {
        window.myCPP.contact = contact;
        updateContactAttribute(contact.getAttributes());    
        contact.onEnded(clearContactAttribute);
    }

    function updateContactAttribute(msg){
        var tableRef = document.getElementById('attributesTable').getElementsByTagName('tbody')[0];      
        for (var key in msg) {
            if (msg.hasOwnProperty(key)) {
                        var row = tableRef.insertRow(tableRef.rows.length);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = key;
                        cell2.innerHTML = msg[key]['value'];
            }
        }
        
    }

    function clearContactAttribute(){
        var old_tbody= document.getElementById('attributesTable').getElementsByTagName('tbody')[0];
        var new_tbody = document.createElement('tbody');    
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody);     
    }

