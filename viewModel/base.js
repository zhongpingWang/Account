

class baseModel {

    save(data,cb) {
        var ins = new this.model(data);
        return ins.save(cb);
    }

    findOne(params){
        return  this.model.findOne(params);
    }

    find(params,cb) {  
       return  this.model.find(params,cb);
    }

    remove(params,cb) {
        
        return this.model.remove(params,cb);
    }

    update(wherestr,updatestr,cb){
       return this.model.update(wherestr,updatestr,cb);
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