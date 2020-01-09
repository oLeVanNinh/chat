"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ChatDashBoardComponent = /** @class */ (function () {
    function ChatDashBoardComponent() {
    }
    ChatDashBoardComponent.prototype.ngOnInit = function () {
    };
    ChatDashBoardComponent.prototype.setRoom = function (event) {
        this.currentRoomId = event;
    };
    ChatDashBoardComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-dash-board',
            templateUrl: './chat-dash-board.component.html',
            styleUrls: ['./chat-dash-board.component.scss']
        })
    ], ChatDashBoardComponent);
    return ChatDashBoardComponent;
}());
exports.ChatDashBoardComponent = ChatDashBoardComponent;
