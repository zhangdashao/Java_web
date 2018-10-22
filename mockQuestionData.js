export default [
    {
        "question_weight": "1",
        "questionId": "b932db93-a899-39f2-a7a5-bd9521a1505c",
        "type": "Radio",
        "latitude": {
            "wd_num": 8,
            "wd_code": "000008",
            "wd_name": "纬度1"
        },
        "content": "您本次就诊满意吗",
        "optData": [
            {
                "optText": "满意",
                "optValue": "10",
                "optId": "400c077a-a422-6a4f-e06c-8e2f361b98ce"
            },
            {
                "optText": "不满意",
                "optValue": "5",
                "optId": "d554c721-9bbe-b262-9cc5-b8b3db7fc731"
            }
        ]
    },
    {
        "question_weight": "2",
        "questionId": "e8eeb808-d429-5021-b2c3-15d321a3b3d9",
        "type": "Checkout",
        "latitude": {
            "wd_num": 9,
            "wd_code": "000009",
            "wd_name": "纬度2"
        },
        "content": "请选择您本次就诊不满意的原因",
        "optData": [
            {
                "optText": "态度不友好",
                "optValue": "10",
                "optId": "fc868c63-2519-ef7c-1ad3-fddd76f35a33"
            },
            {
                "optText": "卫生环境差",
                "optValue": "5",
                "optId": "eb101646-5566-bbde-c8d7-e08980dda3e8"
            },
            {
                "optText": "等候时间长",
                "optValue": "5",
                "optId": "6a6f5d21-c3d4-07e4-77cb-a431e1e4e904"
            },
            {
                "optText": "其他",
                "optValue": "5",
                "optId": "a6390b0e-7d63-6aae-cc92-7471063e1c7d"
            }
        ],
        "relevance": {
            "relyQuestionId": "b932db93-a899-39f2-a7a5-bd9521a1505c",
            "relyOpt": ["d554c721-9bbe-b262-9cc5-b8b3db7fc731", "400c077a-a422-6a4f-e06c-8e2f361b98ce"]
        }
    },
    {
        "question_weight": "3",
        "questionId": "cfec4cbd-d48e-670c-700d-04e3cbfc8141",
        "type": "Select",
        "latitude": {
            "wd_num": 10,
            "wd_code": "000010",
            "wd_name": "纬度3"
        },
        "content": "请选择你本次就诊的科室",
        "optData": [
            {
                "optText": "口腔科",
                "optValue": "10",
                "optId": "d66bbe36-9ce7-b732-71f9-faf861155e78"
            },
            {
                "optText": "胸外科",
                "optValue": "5",
                "optId": "91af8202-e67b-84fb-e98f-ff57524d5a9c"
            },
            {
                "optText": "胸内科",
                "optValue": "4",
                "optId": "616f21a7-cb3b-1316-c5ad-72ed1ef37b41"
            },
            {
                "optText": "外科",
                "optValue": "3",
                "optId": "6c1bff7b-7928-b6b3-da9a-533228221cbf"
            }
        ]
    },
    {
        "question_weight": "4",
        "questionId": "40665f0a-3d4d-aacb-9576-05841d34e42a",
        "type": "Slider",
        "latitude": {
            "wd_num": 9,
            "wd_code": "000009",
            "wd_name": "纬度2"
        },
        "content": "请给本次就诊给个评价",
        "optData": {
            "maxValue": 50,
            "maxText": "满意",
            "minValue": 0,
            "minText": "非常不满意"
        }
    },
    {
        "question_weight": "5",
        "questionId": "d2da86e4-93fe-51d8-f331-f3a0e9810737",
        "type": "Fill",
        "latitude": {
            "wd_num": 9,
            "wd_code": "000009",
            "wd_name": "纬度2"
        },
        "content": "你叫什么名字"
    }
]