// 小程序 API 配置
const app = getApp();
const API_BASE_URL = app.globalData.baseUrl; // 从全局配置获取API地址

// 通用请求函数
function request(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API_BASE_URL}${url}`,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(new Error(`请求失败: ${res.statusCode}`));
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}

/**return a list of categories */
getCategoryList = () => {
    return request('/categories');
}

/**return a list of breeds in a category */
getAllbeeds = (categoryName) => {
    return request(`/breeds/${categoryName}`);
}

/**return a list of pets in a breed */
getPetDetail = (breedName) => {
    return request(`/pets?breed=${breedName}`);
}

/** convert pet name to id */
convertNametoID = (petName) => {
    return request(`/pets?name=${petName}`);
}

/**sort a list of pets by an attribute */
sortByAttribute = (petList, attribute) => {
    return petList.sort((a, b) => {
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
    });
}

/**get details about a specific pet */
getDetails = (petId) => {
    return request(`/pets/${petId}`);
}

// 导出函数供其他页面使用
module.exports = {
    getCategoryList,
    getAllbeeds,
    getPetDetail,
    convertNametoID,
    sortByAttribute,
    getDetails
};

