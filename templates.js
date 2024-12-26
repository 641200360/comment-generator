// 评语模板
const templates = {
    // 优点模板
    strengths: {
        prefix: [
            "该生",
            "这位同学",
            "他/她"
        ],
        content: {
            // 学习成绩
            "优秀": ["学习成绩优异", "各科成绩表现突出", "学习成绩名列前茅"],
            "良好": ["学习成绩良好", "各科成绩均衡发展", "学习态度端正"],
            
            // 专注度
            "高度专注": ["上课专注度高", "课堂上能够全神贯注", "学习态度认真专注"],
            "一般专注": ["能够保持课堂注意力", "课堂参与度良好", "能够跟随教学节奏"],
            
            // 同学关系
            "积极合作": ["善于与同学合作", "乐于参与小组活动", "具有良好的团队协作精神"],
            "友善相处": ["与同学相处融洽", "乐于帮助他人", "具有良好的人际关系"],
            
            // 课堂参与
            "主动发言": ["课堂参与积极主动", "勇于表达自己的观点", "善于与老师互动"],
            
            // 责任心和自律性
            "很有责任心": ["做事认真负责", "能够按时完成作业", "对待学习态度严谨"],
            "较为自律": ["能够自我约束", "有良好的学习习惯", "时间管理能力强"],
            
            // 创新思维
            "思维活跃": ["思维敏捷", "善于独立思考", "勤于思考善于发问"],
            "有创意": ["富有创造力", "善于提出新颖的见解", "想象力丰富"]
        }
    },
    
    // 待改善模板
    improvements: {
        prefix: [
            "在今后的学习中，建议",
            "希望在接下来的时间里，",
            "为了取得更好的进步，建议"
        ],
        content: {
            // 学习成绩
            "需要提升": ["在学习方法上需要进一步改进", "可以多与老师沟通学习中的困惑", "需要加强基础知识的掌握"],
            "偏科": ["注意各科均衡发展", "对薄弱学科要投入更多时间", "合理分配各科学习时间"],
            
            // 专注度
            "易分心": ["提高课堂专注度", "减少上课时的分心行为", "培养持续专注的能力"],
            
            // 同学关系
            "需要改善": ["多参与集体活动", "增进与同学间的交流", "培养团队协作精神"],
            
            // 课堂参与
            "参与度低": ["增加课堂互动", "积极回答问题", "主动参与课堂讨论"],
            
            // 责任心和自律性
            "需要督促": ["培养自主学习的习惯", "提高作业完成质量", "加强时间管理能力"],
            
            // 创新思维
            "思维待开发": ["多角度思考问题", "培养独立思考能力", "勇于表达自己的见解"]
        }
    },
    
    // 祝福语模板
    wishes: [
        // 学习进步型
        "相信通过努力，在下一阶段的学习中一定能取得更大的进步！",
        "期待看到你在各个方面都能有质的飞跃！",
        
        // 目标激励型
        "希望你能够树立明确的目标，朝着理想不断前进！",
        "相信你一定能够克服困难，实现自己的目标！",
        
        // 全面发展型
        "愿你在德、智、体、美、劳各方面都能全面发展，成为一个优秀的学生！",
        "期待你能在知识积累和个人品质上都有更出色的表现！",
        
        // 个性发展型
        "希望你继续保持自己的特色，在各个领域都绽放出独特的光彩！",
        "愿你保持对知识的渴望，让自己的未来充满无限可能！"
    ]
}; 