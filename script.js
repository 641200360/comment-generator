// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 生成评语按钮点击事件
    document.getElementById('generate').addEventListener('click', function() {
        const name = document.getElementById('studentName').value;
        const style = document.querySelector('input[name="style"]:checked').value;
        
        // 收集选中的优点和待改善项
        const strengths = [];
        const improvements = [];
        
        document.querySelectorAll('input[name^="strengths-"]:checked').forEach(input => {
            strengths.push(input.value);
        });
        
        document.querySelectorAll('input[name^="improvements-"]:checked').forEach(input => {
            improvements.push(input.value);
        });
        
        // 生成评语
        let comment = generateComment(name, strengths, improvements, style);
        
        // 显示结果
        document.getElementById('result').value = comment;
    });

    // 复制按钮点击事件
    document.getElementById('copy').addEventListener('click', function() {
        const textarea = document.getElementById('result');
        textarea.select();
        document.execCommand('copy');
    });
});

// 生成评语的函数
function generateComment(name, strengths, improvements, style) {
    const studentName = name ? name + "同学" : "这位同学";
    let comment = studentName + "，";
    
    // 添加优点评价
    if (strengths.length > 0) {
        comment += strengths.join("，") + "。";
    }
    
    // 添加待改善评价
    if (improvements.length > 0) {
        comment += "\n希望在" + improvements.join("，") + "方面继续努力。";
    }
    
    return comment;
} 