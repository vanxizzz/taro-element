import api from "../../service/apis/toFront"


export async function selectMenuByBusinessId(businessId) {
    const {data} = await api.selectMenuAndSpecsByBusinessId(businessId);
    return data;
}

export default {
    selectMenuByBusinessId
}