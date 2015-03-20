//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

module.exports = function(WorkPackageFieldService, ApiHelper) {

  function workPackageFieldDirectiveController() {
    this.isEditable = WorkPackageFieldService.isEditable(this.workPackage, this.field);
    this.isEmpty = WorkPackageFieldService.isEmpty(this.workPackage, this.field);
    this.label = WorkPackageFieldService.getLabel(this.workPackage, this.field);
    if (this.isEditable) {
      this.type = 'text';
      this.isBusy = false;
      this.isEditing = false;
      this.readValue = WorkPackageFieldService.getValue(this.workPackage, this.field);
      this.writeValue = WorkPackageFieldService.getValue(this.workPackage, this.field);
      this.placeholder = WorkPackageFieldService.defaultPlaceholder;
      this.editTitle = I18n.t('js.inplace.button_edit', { attribute: this.field });

      this.onSuccess = function(wp) {
        console.log(this.workPackage, wp, this.workPackage === wp);
        this.readValue = WorkPackageFieldService.getValue(this.workPackage, this.field);
        this.isEditing = false;
      };

      this.onFail = function(e) {
        this.error = ApiHelper.getErrorMessage(e);
      }
    } else {
      this.value = WorkPackageFieldService.format(this.workPackage, this.field);
    }
  }

  return {
    restrict: 'E',
    replace: true,
    controllerAs: 'fieldController',
    bindToController: true,
    templateUrl: '/templates/work_packages/field.html',
    scope: {
      workPackage: '=',
      field: '='
    },
    controller: workPackageFieldDirectiveController
  };
};
