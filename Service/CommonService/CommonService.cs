using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Model;
using Repository.CommonRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.CommonService
{
   
    public class CommonService : ICommonService
    {
        private readonly ICommonRepository _commonRepository;
        public CommonService(ICommonRepository commonRepository)
        {
            _commonRepository = commonRepository;
        }

        public async Task<List<FiscalYears>> GetAllFiscal()
        {
            var data = await _commonRepository.GetAllFiscal();
            return data;
        }
        public async Task<List<Province>> GetProvince()
        {
            var data = await _commonRepository.GetProvince();
            return data;
        }
        public async Task<List<District>> GetDistrictByProvinceIds(int[] provinceIds)
        {
            var data = await _commonRepository.GetDistrictByProvinceIds(provinceIds);
            return data;
        }
        public async Task<List<Palika>> GetMultiplePalikaByMultipleDistrictIds(int[] districtIds)
        {
            var data = await _commonRepository.GetMultiplePalikaByMultipleDistrictIds(districtIds);
            return data;
        }

        public  async Task<List<ProvinceDistrictPalikaVM>> GetProvinceDistrictPalika()
        {
            var data = await _commonRepository.GetProvinceDistrictPalika();
            return data;
        }

        public async Task<bool> ApproveArea(List<ApproveProvinceDistrictPalika> model)
        {
            try
            {
            var province = new Province();
            var district = new District();
            var palika = new Palika();
            foreach (var item in model)
            {
                province.id = item.provinceid;
                province.is_active = item.province_is_active;

                district.id = item.districtid;
                district.is_active=item.district_is_active;

                palika.id = item.palikaid;
                palika.is_active=item.palika_is_active;

                if (province.id !=0)
                {
                    // update province
                    var updateprovince = await _commonRepository.UpdateProvince(province.id, province.is_active);
                }
              
                if (district.id !=0)
                {
                    // update district
                    var updatedistrict = await _commonRepository.UpdateDistrict(district.id, district.is_active);
                }
                if (palika.id !=0)
                {  // update palika
                    var updatepalika = await _commonRepository.UpdatePalika(palika.id, palika.is_active);

                }
            }
                return true;

            }
            catch (Exception)
            {

             return false;
            }
        }

        public async Task<bool> LockoutForFiscalYear(GiveAcessForFiscalYear model)
        {
            try
            {
                var fiscal = new FiscalYears();
                var fiscaldetail = new FiscalDetail();

                fiscal.id = model.fiscalid;
                fiscal.locked = model.fy_locked;

                if (fiscal.id != 0)
                {
                    var updatefiscal = await _commonRepository.LockoutForFiscalYear(fiscal.id, fiscal.locked);
                }

                foreach (var item in model.fiscalYearDetail)
                {
                    fiscaldetail.id = item.fy_detail_id;
                    fiscaldetail.locked = item.fy_detail_locked;

                    if (fiscaldetail.id != 0)
                    {
                        var updatefiscaldetail = await _commonRepository.LockoutForFiscalYearDetail(fiscaldetail.id, fiscaldetail.locked);
                    }

                }
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<List<FiscalDetail>> GetAllFiscalDetail(int fyid)
        {
            var data = await _commonRepository.GetAllFiscalDetail(fyid);
            return data;
        }
    }
}
