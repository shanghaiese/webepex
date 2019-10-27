import { POST, GET } from './api';
export default {
    test(data) {
        const url = 'app/article/typeList';
        return POST(url,data);
    }
}