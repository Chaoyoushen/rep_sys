import Request from '../common/request/js/index';

export default {
	initWO() {
	    return Request().post('/wo/initWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	
	getHisWO() {
	    return Request().post('/wo/getHisWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	getWOInfo(data) {
	    return Request().post('/wo/getWOInfo', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	closeWO(data) {
		return Request().post('/wo/closeWO', {
			header: {
				contentType: 'application/json'
			},
			data:data
		});
	},
	async createWO(data,imgList) {
		let imgPath = '';
		for (let k in imgList) {
			console.log('k:' + imgList[k])
			let res = await this.uploadImage(imgList[k])
			console.log(res)
			if(res.code == 200){
				if(imgPath.length > 0){
					imgPath = imgPath + ';'
				}
				imgPath = imgPath + res.data[0]
			}
		} 
		console.log('imgPath: '+ imgPath)
		data.imgPath = imgPath
		console.log(data)
		let r = Request();
	    return Request().post('/wo/createWO', {
			header: {
			    contentType: 'application/json'
			},
			data: data,
	    });
	},
    uploadImage(path) {
        let r = Request();
        let instance = r.upload('/wo/upload', {
            name: 'image',
            filePath: path,
            header: {
				contentType: 'multipart/form-data'
			},
            onProgressUpdate(res) {
                console.log(res);
            }
        });
        return instance;
    }
	
	
}