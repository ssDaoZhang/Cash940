function myAjax(obj){
    var bankobj = {
        '6226220636247123' : 0,
        '6217007200073805585' : 1,
        '6222034000002530792' : 2,
        '6222034111002530792' : 3,
        '6230580000188338896' : 4,
        '6230520120015495371' : 5,
    }
    var backdata =  bankobj[obj.data];
    obj.callback(backdata);
}
export default myAjax;