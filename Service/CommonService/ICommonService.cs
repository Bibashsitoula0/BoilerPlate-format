using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.CommonService
{
    public interface ICommonService
    {
        Task<List<FiscalDetail>> GetAllFiscalDetail(int fyid);
        Task<List<FiscalYears>> GetAllFiscal(); 
        Task<List<Province>> GetProvince();
        Task<List<District>> GetDistrictByProvinceIds(int[] provinceIds);
        Task<List<Palika>> GetMultiplePalikaByMultipleDistrictIds(int[] districtIds);
        Task<List<ProvinceDistrictPalikaVM>> GetProvinceDistrictPalika();
        Task<bool> ApproveArea(List<ApproveProvinceDistrictPalika> model);
        Task<bool> LockoutForFiscalYear(GiveAcessForFiscalYear model);
    }
}
