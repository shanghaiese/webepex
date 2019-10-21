import { POST, GET } from '@/utils/axios';
export default {
    testList(data) {
        const url = 'user/qureyUserList';
        return POST(url,data);
    },
    testList2(data) {
        const url = '/app/advert/advertList';
        return POST(url,data);
    }
}