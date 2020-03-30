import Request from '../common/request/js/index';

export default {
	initWO() {
	    return Request().post('/wo/initWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	
	rateWO(data) {
	    return Request().post('/wo/rateWO', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	
	getHisWO() {
	    return Request().post('/wo/getHisWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	getEngineerHisWO() {
	    return Request().post('/wo/getEngineerHisWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	getEngineerWO() {
	    return Request().post('/wo/getEngineerWO', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	
	initGrabWOList() {
	    return Request().post('/wo/initGrabWOList', {
	        header: {
	            contentType: 'application/json'
	        },
	    });
	},
	grabWO(data) {
	    return Request().post('/wo/grabWO', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	changeWOAcceptPerson(data) {
	    return Request().post('/wo/changeWOAcceptPerson', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
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
	queryNextPerson(data) {
		return Request().post('/wo/queryNextPerson', {
			header: {
				contentType: 'application/json'
			},
			data:data
		});
	},
	completeWO(data) {
		return Request().post('/wo/acceptWO', {
			header: {
				contentType: 'application/json'
			},
			data:data
		});
	},
	getOPInfo(data) {
	    return Request().post('/operation/getOPInfo', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	getOpWO(data) {
	    return Request().post('/operation/queryOPList', {
	        header: {
	            contentType: 'application/json'
	        },
			data:data
	    });
	},
	uploadOperation(data) {
	    return Request().post('/operation/uploadOperation', {
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