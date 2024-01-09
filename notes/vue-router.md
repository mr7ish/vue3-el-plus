# vue-router

## 动态路由匹配

#### 匹配模式
```typescript
[
    {
        path: '/users/:id',
        component: Users
    },
    {
        path: 'users/:id/post/:postId',
        component: Users
    },
    ...
]
```

#### 匹配路径
```typescript
/users/tony

/users/john/post/1
```

#### params
```typescript
$route.params

{
    id: 'john',
    postId: '1'
}
```

#### problems
相同组件实例将被重复使用，组件不会销毁再创建，复用更高效，这意味着组件的生命周期钩子不会被调用。

可以监听 params 的变化作出响应
```typescript
const routes = useRoute();
watch(() => $route.params, (newParams, oldParams) => {
    ...
})
```

### 匹配所有路由 或 404 Not Found路由
```typescript
path: '/:pathMatch(.*)*'
```

## 路由匹配语法

#### 自定义正则
在参数后的括号中书写正则表达式

匹配数字
```typescript
path: '/:userId(\\d+)'
/1
```
匹配其它任何内容
```typescript
path: '/:anything'
/other
```

#### 可重复参数
+(1个或多个)
```typescript
path: '/:chapters+'
/one, /one/two, /one/two/three, ...
```

*(0个或多个)
```typescript
path: '/:chapters*'
/, /one, /one/tow, ...
```

#### 可选参数
?(0个或1个)
```typescript
path: '/:chapters?'
/, /one
```

#### 自定义正则结合可重复参数或可选参数使用
```typescript
path: '/:chapters(\\d+)+'
/1, /1/2, ...
```

```typescript
path: '/:chapters(\\d+)*'
/, /1, /1/2, ...
```

```typescript
path: '/:chapters(\\d+)?'
/, /1
```

#### sensitive 和 strict 属性
默认情况，path: '/users'
<br>
可匹配：/users、/Users、/users/、/Users/

sensitive: 大小写敏感
<br>
strict: 尾部不能带斜线
```typescript
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 作用于单个路由
        {
            path: '/users',
            sensitive: true,
            strict: true
        }
    ],
    // 作用于所有路由
    sensitive: true,
    strict: true
})
```