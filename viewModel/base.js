

class baseModel {

    save(data,cb) {
        var ins = new this.model(data);
        ins.save(cb);
    }

    find(params,cb) { 
        this.model.find(params,cb);
    }

    remove(params,cb) {
        
        this.model.remove(params,cb);
    }

    update(wherestr,updatestr,cb){
        this.model.update(wherestr,updatestr,cb);
    }

    resJSON(res,data){


        res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8'});

        var resData = {
            code: 0,
            data:data
        }

        res.write(JSON.stringify(resData));
        res.end();
    }

    resError(res,msg){

        res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8'});

        var resData = {
            code: -1,
            message:msg
        }

        res.write(JSON.stringify(resData));
        res.end();
    } 

}

exports = module.exports = baseModel;