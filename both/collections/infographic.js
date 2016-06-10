Infographic = new Mongo.Collection('infographic');

Infographic.attachSchema(new SimpleSchema({
    date: {
        type: Date,
        label: '일자',
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    },
    title: {
        type: String,
        label: '제목'
    },
    summary: {
        type: String,
        label: '요약'
    },
    image: {
        type: String,
        label: '이미지',
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "Images",
                accept: 'image/*'
            }
        }
    },
    category: {
        type: String,
        label: '카테고리',
        allowedValues: ['인포1', '인포2', '인포3'],
        autoform: {
            options: [
                {label: "인포1", value: "인포1"},
                {label: "인포2", value: "인포2"},
                {label: "인포3", value: "인포3"},
            ]
        }
    }
}));
