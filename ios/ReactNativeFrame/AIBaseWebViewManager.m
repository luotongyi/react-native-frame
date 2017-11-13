//
//  AIBaseWebViewManager.m
//  ReactAppCQ
//
//  Created by luoty on 2017/11/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AIBaseWebViewManager.h"
#import <WebKit/WebKit.h>
#import <React/RCTComponent.h>

@interface AIBaseWebView : WKWebView

@property (nonatomic,copy) NSString *url;

@property (nonatomic,copy) RCTBubblingEventBlock onClick;

@property (nonatomic,copy) RCTBubblingEventBlock onFinishLoad;

@end

@implementation AIBaseWebView

- (void)setUrl:(NSString *)url
{
  _url = url;
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
  NSURL *baseURL = [[NSBundle mainBundle] bundleURL];
  [self loadHTMLString:[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] baseURL:baseURL];
  
//  [self loadRequest:[NSMutableURLRequest requestWithURL:[NSURL URLWithString:_url] cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:20]];
}

@end


@interface AIBaseWebViewManager ()<WKNavigationDelegate,WKScriptMessageHandler>
{
  AIBaseWebView *aiWebView;
}
@end

@implementation AIBaseWebViewManager

RCT_EXPORT_MODULE()
//RN里可用的属性
RCT_EXPORT_VIEW_PROPERTY(url, NSString)
RCT_EXPORT_VIEW_PROPERTY(onClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFinishLoad, RCTBubblingEventBlock)
//提供方法给JS调用
RCT_EXPORT_METHOD(testAction:(NSString *)text){

  NSLog(@"%@",text);
}
RCT_EXPORT_METHOD(removeWebPlugins){
  for (NSString *name in [self pluginNameArray]) {
    [((WKWebViewConfiguration *)[self configWebPlugins]).userContentController removeScriptMessageHandlerForName:name];
  }
  NSLog(@"我已经移除了插件啦！");
}


//Bridge指定执行模块里的方法所在的队列，不知道什么鬼，干嘛用的？
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (NSArray *)pluginNameArray
{
  return @[@"shareToWeixin",
           @"shareToSms",
           @"shareToSinaWeibo",
           @"shareToQQ",
           @"setMyHeader"];
}

- (id)configWebPlugins
{
  WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
  WKUserContentController *userContentController = [[WKUserContentController alloc] init];
  
  NSArray *nameArray = [self pluginNameArray];
  
  for (NSString *name in nameArray) {
    [userContentController addScriptMessageHandler:self name:name];
  }
  
  config.userContentController = userContentController;
  
  return config;
}

- (UIView *)view
{
  WKWebViewConfiguration *webConfig = [self configWebPlugins];
  aiWebView = [[AIBaseWebView alloc] initWithFrame:CGRectZero configuration:webConfig];
  aiWebView.navigationDelegate = self;
  return aiWebView;
}

#pragma mark - 加载JS处理
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
  [self actionWithJSMethod:message];
}

- (void)actionWithJSMethod:(WKScriptMessage *)script
{
  NSLog(@"%@",script.body);
  id body = script.body;
  if ([body isKindOfClass:[NSDictionary class]] && [((NSDictionary *)body) count]>0)
  {
    NSDictionary *dict = script.body;
//    NSString *scriptName = script.name;
    aiWebView.onClick(dict);
  }
  else
  {
    
  }
}

#pragma mark - WKWebview
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler
{
  
  decisionHandler(WKNavigationActionPolicyAllow);
  
}

- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation
{
  
  
}

- (void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation
{
  
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error
{
  
  if(error.code == NSURLErrorCancelled)  {
    return;
  }
  
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
    aiWebView.onFinishLoad(@{@"title":webView.title});
}

@end

