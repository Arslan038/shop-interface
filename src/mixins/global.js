import nativeToast from 'native-toast'
import axios from 'axios'
 
export default {
    methods: {
        getUser() {
            const user = JSON.parse(localStorage.getItem('manicardsShop'))
            if(user) {
                return user
            }
            return null
        },
        getUserData() {
            const user = JSON.parse(localStorage.getItem('manicardsShopData'))
            if(user) {
                return user
            }
            return null
        },
        notification(msg, type) {
            nativeToast({
                message: msg,
                position: 'north-east',
                // Self destroy in 5 seconds
                timeout: 5000,
                type: type
              })
        },
        // UPLOAD IMAGE
        async uploadImage(payload) {
            let upload = null
            let form = new FormData();
            form.append('photo', payload.File)
            await axios.post(baseURL+'uploadimage/'+payload.id, form).then(result => {
                if(result.status == 200) {
                    
                    let path = result.data[0]
                    path = path.replace(/\\/g, "/")
                    let splitUrl = path.split('api')[1]
                    let url = 'http://www.api.manicards.com'+splitUrl
                    upload = url
                }
            })
            //console.log(upload)
            return upload
        }
    }
}