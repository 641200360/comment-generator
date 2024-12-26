// 评语模板
const templates = {
    praise: {
        prefix: [
            "这位同学",
            "该生",
            "他/她"
        ],
        strengths: {
            "优秀": "学习成绩优异",
            "良好": "学习成绩良好",
            "高度专注": "上课专注度高",
            "一般专注": "课堂表现积极",
            "积极合作": "乐于与同学合作",
            "友善相处": "与同学相处融洽",
            "主动发言": "课堂参与度高",
            "很有责任心": "做事认真负责",
            "较为自律": "能够自我约束",
            "思维活跃": "思维活跃",
            "有创意": "富有创造力"
        },
        improvements: {
            "需要提升": "学习还需要更加努力",
            "偏科": "各科发展不够均衡",
            "易分心": "注意力有待提高",
            "需要改善": "人际关系需要改善",
            "参与度低": "课堂参与度需要提高",
            "需要督促": "自律性有待加强",
            "思维待开发": "创新思维有待开发"
        }
    },
    encourage: {
        // 类似的结构，但用更鼓励的语气
    },
    suggest: {
        // 类似的结构，但用建议的语气
    }
}; 