# Huawei-Cloud-KooCLI-action
[华为云命令行工具服务（Koo Command Line Interface，KooCLI，原名HCloud CLI）](https://support.huaweicloud.com/productdesc-hcli/hcli_01.html)，是为发布在API Explorer上的华为云服务API提供的命令行管理工具。您可以通过此工具调用API Explorer中各云服务开放的API，管理和使用您的各类云服务资源。
本action主要用于安装KooCLI工具，以便在workflow中快捷调用华为云服务中各云服务开放的API。

## **前置工作**
(1).action调用华为云接口需要华为云鉴权，建议将您华为云账户的ak/sk配置于您GitHub工程中的settting-Secret-Actions，分别添加为ACCESSKEY、SECRETACCESSKEY以加密使用，[获取ak/sk方式](https://support.huaweicloud.com/api-obs/obs_04_0116.html)；
(2). 获取云服务API调用命令。
> 获取云服务API调用命令有两种方式：  
1.（推荐）[API Explorer](https://apiexplorer.developer.huaweicloud.com/apiexplorer/overview)上获取：云服务的API可在API Explorer上查看。您可以在API Explorer对应的API调试中，填写各参数的值，然后从“CLI示例”页签中直接获取命令。
2.KooCLI帮助信息查询：具体查询方法可参考查看与[执行云服务操作命令](https://support.huaweicloud.com/qs-hcli/hcli_02_005.html)，Mac和Linux系统下查询方法类似。

## **华为云统一鉴权认证**
推荐使用[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)进行OBS操作的鉴权认证。
```yaml
    - name: Authenticate to Huawei Cloud
      uses: huaweicloud/auth-action@v1.0.0
      with: 
          access_key_id: ${{ secrets.ACCESSKEY }} 
          secret_access_key: ${{ secrets.SECRETACCESSKEY }}
          region: '<region>'
```

## **参数说明:**
|  参数名称  |  参数说明  |  默认值  |  是否必填  |
|  :----:  |  ----  |  :----: |  :----:  |
| access_key  | 访问密钥ID。与私有访问密钥关联的唯一标识符，和私有访问密钥(secret_key)一起使用，对请求进行加密签名。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| secret_key  | 与访问密钥ID(access_key)结合使用的私有访问密钥，对请求进行加密签名，可标识发送方，并防止请求被修改。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| region  | 默认区域，如cn-north-4。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  cn-north-4  |  否  |
| command_list | 安装完KooCLI后，想要执行的操作指令，可以添加多条。 | 无 | 否 |
> 关于参数'region'：在没有添加参数'--cli-region'的操作指令中，会使用这个默认region。具体region参数的使用，请参考您要使用的服务允许的[地区和终端节点](https://developer.huaweicloud.com/endpoint)

## **使用样例:**
以下action示例片段若无特别说明，均默认使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)。  
1、查询弹性云服务器*华北-北京四*API版本信息列表（使用默认region）
```yaml
steps:
  - name: Set up KooCLI and List Versions of ECS
    uses: huaweicloud/huaweicloud-cli-action@v1.0.3
    with:
      commandList: 'hcloud ECS NovaListVersions'
```
2、指定参数，查询弹性云服务器指定API版本信息
```yaml
steps:
  - name: Set up KooCLI
    uses: huaweicloud/huaweicloud-cli-action@v1.0.3

  - name: Show Specific Version Info of ECS by KooCLI
    run: 'hcloud ECS NovaShowVersion --cli-region="cn-north-4" --api_version="v2.1"'
```

具体使用样例请见 [huaweicloud-cli-workflow-samples](https://github.com/huaweicloud/huaweicloud-cli-workflow-samples)

## Action中使用的公网地址说明
- 适配 Windows系统的KooCLI下载地址：'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-windows-amd64.zip'
- 适配 Linux ARM 64位系统的KooCLI下载地址：'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-linux-arm64.tar.gz'
- 适配 Linux AMD 64位系统的KooCLI下载地址： 'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-linux-amd64.tar.gz'
- 适配 MacOS ARM 64位系统的KooCLI下载地址：'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-mac-arm64.tar.gz'
- 适配 MacOS AMD 64位系统的KooCLI下载地址：'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-mac-amd64.tar.gz'

## 第三方开源包引入的公网地址
- https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary