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
        
        // 添加保存到历史记录
        if (comment) {
            saveToHistory(comment, name);
        }
    });

    // 复制按��点击事件
    document.getElementById('copy').addEventListener('click', function() {
        const textarea = document.getElementById('result');
        textarea.select();
        document.execCommand('copy');
    });

    // 导航功能
    const sections = {
        'generator': document.getElementById('generator'),
        'history': document.getElementById('history'),
        'help': document.getElementById('help')
    };

    // 导航点击事件
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 隐藏所有区域
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // 显示目标区域
            sections[targetId].classList.remove('hidden');
            
            // 更新导航激活状态
            document.querySelectorAll('nav a').forEach(a => {
                a.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // 默认显示生成器页面
    document.querySelector('a[href="#generator"]').click();

    // 历史记录功能
    const historyList = document.querySelector('.history-list');
    const downloadBtn = document.getElementById('downloadHistory');
    const clearBtn = document.getElementById('clearHistory');

    // 从 localStorage 加载历史记录
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-message">暂无历史记录</p>';
            return;
        }

        history.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="comment">${item.comment}</div>
                <div class="meta">
                    ${item.name} | ${new Date(item.timestamp).toLocaleString()}
                </div>
                <div class="actions">
                    <button onclick="copyHistory(${index})">复制</button>
                    <button onclick="deleteHistory(${index})" class="delete">删除</button>
                </div>
            `;
            historyList.appendChild(div);
        });
    }

    // 保存评语到历史记录
    function saveToHistory(comment, name) {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        history.unshift({
            comment,
            name: name || '未命名',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('commentHistory', JSON.stringify(history));
        loadHistory();
    }

    // 复制历史记录
    window.copyHistory = function(index) {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        const textarea = document.createElement('textarea');
        textarea.value = history[index].comment;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('已复制到剪贴板');
    };

    // 删除历史记录
    window.deleteHistory = function(index) {
        if (confirm('确定要删除这条记录吗？')) {
            const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
            history.splice(index, 1);
            localStorage.setItem('commentHistory', JSON.stringify(history));
            loadHistory();
        }
    };

    // 下载历史记录
    downloadBtn.addEventListener('click', function() {
        const history = JSON.parse(localStorage.getItem('commentHistory') || '[]');
        const text = history.map(item => 
            `${item.name}\n${item.comment}\n${new Date(item.timestamp).toLocaleString()}\n\n`
        ).join('---\n');
        
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '评语历史记录.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // 清空历史记录
    clearBtn.addEventListener('click', function() {
        if (confirm('确定要清空所有历史记录吗？')) {
            localStorage.removeItem('commentHistory');
            loadHistory();
        }
    });

    // 初始加载历史记录
    loadHistory();
});

// 生成评语的函数
function generateComment(name, strengths, improvements, style) {
    const studentName = name ? name + "同学" : "这位同学";
    let comment = "";
    
    // 第一段：优点评价
    if (strengths.length > 0) {
        comment += studentName;
        const strengthTexts = strengths.map(s => templates.strengths.content[s] || s);
        comment += "在学习过程中，" + strengthTexts.join("，") + "。\n\n";
    }
    
    // 第二段：待改善部分
    if (improvements.length > 0) {
        const prefix = templates.improvements.prefix[Math.floor(Math.random() * templates.improvements.prefix.length)];
        const improvementTexts = improvements.map(i => templates.improvements.content[i] || i);
        comment += prefix + improvementTexts.join("，") + "。\n\n";
    }
    
    // 第三段：祝福语
    const wish = templates.wishes[Math.floor(Math.random() * templates.wishes.length)];
    comment += wish;
    
    return comment;
} 