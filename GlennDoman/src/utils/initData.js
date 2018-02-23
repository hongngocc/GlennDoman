import Realm from 'realm';

import * as schema from '../realm/schema/schema';
export const initData = () => {

    Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            realm.write(() => {
                let family = realm.create('Topic', {
                    title: 'Gia đình',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                family.words.push({ text: 'bố', isComplete: false, path: '' });
                family.words.push({ text: 'mẹ', isComplete: false, path: '' });
                family.words.push({ text: 'cô', isComplete: false, path: '' });
                family.words.push({ text: 'dì', isComplete: false, path: '' });
                family.words.push({ text: 'chú', isComplete: false, path: '' });
                family.words.push({ text: 'bác', isComplete: false, path: '' });
                family.words.push({ text: 'ông', isComplete: false, path: '' });
                family.words.push({ text: 'bà', isComplete: false, path: '' });
                family.words.push({ text: 'anh', isComplete: false, path: '' });
                family.words.push({ text: 'chị', isComplete: false, path: '' });
                family.words.push({ text: 'cậu', isComplete: false, path: '' });
                family.words.push({ text: 'mợ', isComplete: false, path: '' });
                
                let body = realm.create('Topic', {
                    title: 'Bộ phận cơ thể',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                body.words.push({ text: 'tai', isComplete: false, path: '' });
                body.words.push({ text: 'mắt', isComplete: false, path: '' });
                body.words.push({ text: 'mũi', isComplete: false, path: '' });
                body.words.push({ text: 'đầu', isComplete: false, path: '' });
                body.words.push({ text: 'tóc', isComplete: false, path: '' });
                body.words.push({ text: 'chân', isComplete: false, path: '' });
                body.words.push({ text: 'tay', isComplete: false, path: '' });
                body.words.push({ text: 'lưỡi', isComplete: false, path: '' });
                body.words.push({ text: 'rốn', isComplete: false, path: '' });
                body.words.push({ text: 'cổ', isComplete: false, path: '' });
                body.words.push({ text: 'môi', isComplete: false, path: '' });
                body.words.push({ text: 'trán', isComplete: false, path: '' });
                body.words.push({ text: 'má', isComplete: false, path: '' });
                body.words.push({ text: 'cằm', isComplete: false, path: '' });
                body.words.push({ text: 'miệng', isComplete: false, path: '' });
                body.words.push({ text: 'răng', isComplete: false, path: '' });
                body.words.push({ text: 'lợi', isComplete: false, path: '' });
                body.words.push({ text: 'vai', isComplete: false, path: '' });
                body.words.push({ text: 'ngực', isComplete: false, path: '' });
                body.words.push({ text: 'bụng', isComplete: false, path: '' });
                body.words.push({ text: 'eo', isComplete: false, path: '' });
                body.words.push({ text: 'mông', isComplete: false, path: '' });
                body.words.push({ text: 'đùi', isComplete: false, path: '' });
                
                let animals = realm.create('Topic', {
                    title: 'Động vật',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                animals.words.push({ text: 'chó', isComplete: false, path: '' });
                animals.words.push({ text: 'mèo', isComplete: false, path: '' });
                animals.words.push({ text: 'ngựa', isComplete: false, path: '' });
                animals.words.push({ text: 'lợn', isComplete: false, path: '' });
                animals.words.push({ text: 'trâu', isComplete: false, path: '' });
                animals.words.push({ text: 'bò', isComplete: false, path: '' });
                animals.words.push({ text: 'gà', isComplete: false, path: '' });
                animals.words.push({ text: 'ếch', isComplete: false, path: '' });
                animals.words.push({ text: 'vịt', isComplete: false, path: '' });
                animals.words.push({ text: 'khỉ', isComplete: false, path: '' });
                animals.words.push({ text: 'bướm', isComplete: false, path: '' });
                animals.words.push({ text: 'ốc', isComplete: false, path: '' });
                animals.words.push({ text: 'sò', isComplete: false, path: '' });
                animals.words.push({ text: 'hến', isComplete: false, path: '' });
                animals.words.push({ text: 'dơi', isComplete: false, path: '' });
                animals.words.push({ text: 'chim', isComplete: false, path: '' });
                animals.words.push({ text: 'vẹt', isComplete: false, path: '' });
                animals.words.push({ text: 'rắn', isComplete: false, path: '' });
                animals.words.push({ text: 'ong', isComplete: false, path: '' });
                animals.words.push({ text: 'nhện', isComplete: false, path: '' });
                animals.words.push({ text: 'gián', isComplete: false, path: '' });
                animals.words.push({ text: 'kiến', isComplete: false, path: '' });
                animals.words.push({ text: 'lừa', isComplete: false, path: '' });
                animals.words.push({ text: 'dê', isComplete: false, path: '' });
                animals.words.push({ text: 'cáo', isComplete: false, path: '' });
                animals.words.push({ text: 'hổ', isComplete: false, path: '' });
                animals.words.push({ text: 'sứa', isComplete: false, path: '' });
                animals.words.push({ text: 'sâu', isComplete: false, path: '' });
                animals.words.push({ text: 'giun', isComplete: false, path: '' });
                animals.words.push({ text: 'dế', isComplete: false, path: '' });
                animals.words.push({ text: 'voi', isComplete: false, path: '' });
                animals.words.push({ text: 'gấu', isComplete: false, path: '' });
                animals.words.push({ text: 'nai', isComplete: false, path: '' });
                animals.words.push({ text: 'thỏ', isComplete: false, path: '' });
                animals.words.push({ text: 'vượn', isComplete: false, path: '' });
                animals.words.push({ text: 'cá', isComplete: false, path: '' });
                animals.words.push({ text: 'tôm', isComplete: false, path: '' });
                animals.words.push({ text: 'cua', isComplete: false, path: '' });
                animals.words.push({ text: 've', isComplete: false, path: '' });
                animals.words.push({ text: 'chồn', isComplete: false, path: '' });
                animals.words.push({ text: 'sóc', isComplete: false, path: '' });
                animals.words.push({ text: 'cóc', isComplete: false, path: '' });
                animals.words.push({ text: 'nhím', isComplete: false, path: '' });
                animals.words.push({ text: 'heo', isComplete: false, path: '' });
                
                let fruits = realm.create('Topic', {
                    title: 'Qủa',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                fruits.words.push({ text: 'cam', isComplete: false, path: '' });
                fruits.words.push({ text: 'bưởi', isComplete: false, path: '' });
                fruits.words.push({ text: 'xoài', isComplete: false, path: '' });
                fruits.words.push({ text: 'chuối', isComplete: false, path: '' });
                fruits.words.push({ text: 'táo', isComplete: false, path: '' });
                fruits.words.push({ text: 'nho', isComplete: false, path: '' });
                fruits.words.push({ text: 'chanh', isComplete: false, path: '' });
                fruits.words.push({ text: 'lê', isComplete: false, path: '' });
                fruits.words.push({ text: 'mận', isComplete: false, path: '' });
                fruits.words.push({ text: 'dứa', isComplete: false, path: '' });
                fruits.words.push({ text: 'đào', isComplete: false, path: '' });
                fruits.words.push({ text: 'quýt', isComplete: false, path: '' });
                fruits.words.push({ text: 'dừa', isComplete: false, path: '' });
                fruits.words.push({ text: 'ổi', isComplete: false, path: '' });
                fruits.words.push({ text: 'na', isComplete: false, path: '' });
                fruits.words.push({ text: 'mít', isComplete: false, path: '' });
                fruits.words.push({ text: 'khế', isComplete: false, path: '' });
                fruits.words.push({ text: 'sấu', isComplete: false, path: '' });
                
                let nature = realm.create('Topic', {
                    title: 'Thế giới tự nhiên',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                nature.words.push({ text: 'ao', isComplete: false, path: '' });
                nature.words.push({ text: 'hồ', isComplete: false, path: '' });
                nature.words.push({ text: 'sông', isComplete: false, path: '' });
                nature.words.push({ text: 'suối', isComplete: false, path: '' });
                nature.words.push({ text: 'núi', isComplete: false, path: '' });
                nature.words.push({ text: 'biển', isComplete: false, path: '' });
                nature.words.push({ text: 'thác', isComplete: false, path: '' });
                nature.words.push({ text: 'gió', isComplete: false, path: '' });
                nature.words.push({ text: 'mưa', isComplete: false, path: '' });
                nature.words.push({ text: 'mây', isComplete: false, path: '' });
                nature.words.push({ text: 'nắng', isComplete: false, path: '' });
                nature.words.push({ text: 'bão', isComplete: false, path: '' });
                           
                let color = realm.create('Topic', {
                    title: 'Màu',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                color.words.push({ text: 'xanh', isComplete: false, path: '' });
                color.words.push({ text: 'đỏ', isComplete: false, path: '' });
                color.words.push({ text: 'vàng', isComplete: false, path: '' });
                color.words.push({ text: 'trắng', isComplete: false, path: '' });
                color.words.push({ text: 'cam', isComplete: false, path: '' });
                color.words.push({ text: 'hồng', isComplete: false, path: '' });
                color.words.push({ text: 'đen', isComplete: false, path: '' });
                color.words.push({ text: 'nâu', isComplete: false, path: '' });
                color.words.push({ text: 'tím', isComplete: false, path: '' });
                
                let verb = realm.create('Topic', {
                    title: 'Động từ',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                verb.words.push({ text: 'ăn', isComplete: false, path: '' });
                verb.words.push({ text: 'uống', isComplete: false, path: '' });
                verb.words.push({ text: 'ngủ', isComplete: false, path: '' });
                verb.words.push({ text: 'học', isComplete: false, path: '' });
                verb.words.push({ text: 'chơi', isComplete: false, path: '' });
                verb.words.push({ text: 'chạy', isComplete: false, path: '' });
                verb.words.push({ text: 'nhảy', isComplete: false, path: '' });
                verb.words.push({ text: 'đi', isComplete: false, path: '' });
                verb.words.push({ text: 'múa', isComplete: false, path: '' });
                verb.words.push({ text: 'bay', isComplete: false, path: '' });
                verb.words.push({ text: 'bơi', isComplete: false, path: '' });
                verb.words.push({ text: 'cầm', isComplete: false, path: '' });
                verb.words.push({ text: 'nắm', isComplete: false, path: '' });
                verb.words.push({ text: 'lấy', isComplete: false, path: '' });
                verb.words.push({ text: 'ném', isComplete: false, path: '' });
                verb.words.push({ text: 'kéo', isComplete: false, path: '' });
                verb.words.push({ text: 'đẩy', isComplete: false, path: '' });
                verb.words.push({ text: 'mua', isComplete: false, path: '' });
                verb.words.push({ text: 'bán', isComplete: false, path: '' });
                verb.words.push({ text: 'nằm', isComplete: false, path: '' });
                verb.words.push({ text: 'ngồi', isComplete: false, path: '' });
                
            });
            realm.close();
        }).catch(err => {});
}
