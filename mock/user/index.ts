//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            username: 'admin',
            password: '111111',
            token: 'Admin Token',
            permission: [{ name: 'home'},{ name: 'dashboard'},{ name: 'form', children: ['formBas', 'formDes']},{ name: 'table', children: ['tableBas', 'tableDes']},{
                name: 'image',children:['imageCropper','imageCompress']
            }],
        },
        {
            userId: 2,
            username: 'system',
            password: '111111',
            token: 'System Token',
            permission: ['home', 'dashboard'],
        },
    ]
}
 
export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有token返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '未登录' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
    // 权限分配
    {
        url: '/api/user/permission',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            console.log(checkUser);
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取失败' }}
            }
            return { code: 200, data: { permission: checkUser.permission} }
        }
    }
]