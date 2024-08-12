import routes from "../routes";
import { useSelector } from "react-redux";
import { getItem } from "../../utils/storeages";

export default function PermissionChecker() {
    const userPermission:any = getItem("permission") || [];
    console.log(userPermission,88);
    let newRuoutes:any  = []
    routes.map((item: any) => {
        console.log(item.meta,99)
        if(userPermission.includes(item.meta.permission[0])) {
            newRuoutes.push(item)
            // return item;
        }
    });
    return newRuoutes;
}
