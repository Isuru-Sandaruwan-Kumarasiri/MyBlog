import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { FilterPaginationData } from "../Common/FilterPagination";
import Loader from "../Components/Loader";
import Page_Animation from "../Common/Page_Animation";
import NoDataMessage from "../Components/NoDataMessage";
import NotificationCard from "../Components/NotificationCard";


const NotificationPage=()=>{

    const [filter,setFilter]=useState('all');

    let filters=['all','like','comment','reply'];

    let {userAuth:{access_token}}=useContext(UserContext);

    const [notifications,setNotifications]=useState(null);


    const fetchNotifications=({page,deletedDocCount=0})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/notifications",{page,filter,deletedDocCount},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(async({data:{notifications:data}})=>{
           
            console.log(data);

            let formatedData=await FilterPaginationData({
                state:notifications,
                data,page,
                countRoute:"/all-notifications-count",
                data_to_send:{filter},
                user:access_token
            })
            setNotifications(formatedData);
            console.log(formatedData);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        if(access_token){
            fetchNotifications({page:1});
        }
    },[access_token,filter])

    const handleFilter=(e)=>{

           let btn=e.target;

           setFilter(btn.innerHTML);
           setNotifications(null) ;
    }
    return(
        <div>
            <h1 className="max-md:hidden">Recent Notifications</h1>

            <div className="my-8 flex gap-6">
                {
                    filters.map((filtername,i)=>{
                        return <button key={i} className={"py-2 "+(filter==filtername ?" btn-dark ":" btn-light ")} onClick={handleFilter}>{filtername}</button>
                    })
                } 
            </div>

            {
              notifications==null ?<Loader/>:
              <>
                  {
                    notifications.results.length?
                      notifications.results.map((notification,i)=>{
                        return<Page_Animation key={i} transition={{delay:i*0.08}}>
                                  <NotificationCard/>
                              </Page_Animation>
                      })
                      :<NoDataMessage message="Nothing available"/>
                  }
              </>
            }
        </div>
    )
}
export default NotificationPage;