if(!window.magiconchToolsEnhanceFunctions) throw new Error('未安装通用小工具功能增强用户脚本');


// async function fetchData(url) {
//     const response = await fetch(url);
//     const result = await response.json();
//     return result.data;
// }


async function fetchData(url) {
    console.log('fetchData', url);
    const result = await MC.fetch(url,{
        responseType: 'json'
    });
    console.log(url, result);
    if(!result.response.data) return;

    return result.response.data;
}

async function fetchPost(uuid) {
    const result = await fetchData(`https://m.weibo.cn/statuses/show?id=${uuid}`);

    log(`获取到微博 评论数：${result.comments_count}，转发数：${result.reposts_count}，点赞数：${result.attitudes_count}`);
    return result;
}

async function fetchComments(id, mid, max_id, max_id_type) {
    let url = `https://m.weibo.cn/comments/hotflow?id=${id}&mid=${mid}&max_id_type=${max_id_type}`;
    if (max_id) {
        url += `&max_id=${max_id}`;
    }
    const result = await fetchData(url);
    return result; 
}

async function fetchAllComments(id, mid) {
    log(``);
    log('开始获取评论');
    let comments = [];
    let max_id;
    let max_id_type = 0;
    let total_number;
    do {
        const result = await fetchComments(id, mid, max_id, max_id_type);
        if(!result){
            log(`评论获取结束，部分评论获取失败，共获取 ${comments.length} 条评论`)
            return comments;
        }
        console.log(result);

        max_id = result.max_id;
        max_id_type = result.max_id_type;
        total_number = result.total_number;
        comments = comments.concat(result.data);
        log(`已获取 ${comments.length} 条评论`);
    } while (comments.length < total_number);
    return comments;
}

async function getRandomNickname(id, mid) {
    const comments = await fetchAllComments(id, mid);
    const users = [];
    const Users = {};
    comments.forEach(comment => {
        const user = comment.user || comment.more_info_users;
        const nickname = user.screen_name;
        if( Users[nickname] ) return;
        Users[nickname] = user;
    });
    const nicknames = Object.keys(Users);
    console.log('Users',Users);
    const user = Users[nicknames[Math.floor(Math.random() * nicknames.length)]];
    log(`获取到 ${comments.length} 条评论，${nicknames.length} 个不同的用户`);
    log(``);
    log(`抽选一名幸运用户`);
    log(`昵称：${user.screen_name}\n主页：https://weibo.com/u/${user.id}`);
}


const inputEl = $('input');
const buttonEl = $('button');
buttonEl.addEventListener('click', async () => {
    const text = (inputEl.value || inputEl.getAttribute('placeholder')).trim();
    if (!text){
        alert('请输入微博详情页地址');
        inputEl.focus();
        return;
    }
    const match = text.match(/weibo\.com\/\d+\/(\w+)/);
    if (!match) return alert('请输入正确的微博详情页地址');

    clearLog();

    log(`微博地址：${text}`);

    buttonEl.disabled = true;
    buttonEl.innerText = '正在抽奖...';

    const uuid = match[1];

    const post = await fetchPost(uuid);
    await getRandomNickname(post.id, post.mid);
    buttonEl.disabled = false;
    buttonEl.innerText = '开始抽奖';

});


const outputEl = $('pre.output-pre');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function clearLog() {
    outputEl.textContent = '';
}